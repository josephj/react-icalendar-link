export interface ICalEvent {
  title: string;
  startTime: string;
  description?: string;
  endTime?: string;
  location?: string;
  attendees?: string[];
  url?: string;
}

function pad(num: number): string {
  if (num < 10) {
    return `0${num}`;
  }
  return `${num}`;
}

export function formatDate(dateString: string): string {
  const dateTime = new Date(dateString);
  return [
    dateTime.getUTCFullYear(),
    pad(dateTime.getUTCMonth() + 1),
    pad(dateTime.getUTCDate()),
    "T",
    pad(dateTime.getUTCHours()),
    pad(dateTime.getUTCMinutes()) + "00Z"
  ].join("");
}

export function buildUrl(
  event: ICalEvent|ICalEvent[],
  useDataURL: boolean = false,
  rawContent: string[]|string = ""
): string {
  const body: string[] = [];
  const parsedEvents = Array.isArray(event) ? event : [event];
  
  parsedEvents.forEach((innerEvent, i) => {
    if (!innerEvent || !innerEvent.startTime || !innerEvent.title)
      throw Error("Both startTime and title fields are mandatory");
    
      body.push("BEGIN:VEVENT");
      body.push(`DTSTART:${formatDate(innerEvent.startTime)}`);
      body.push(`SUMMARY:${innerEvent.title}`);

      innerEvent.url && body.push(`URL:${innerEvent.url}`);
      innerEvent.attendees &&
        innerEvent.attendees.forEach(attendee => {
          const regExp = /^([^<]+)\s*<(.+)>/;
          const matches = attendee.match(regExp);
          if (matches) {
            const name = matches[1];
            const email = matches[2];
            body.push(
              [
                "ATTENDEE",
                `CN=${name}`,
                "CUTYPE=INDIVIDUAL",
                "PARTSTAT=NEEDS-ACTION",
                "ROLE=REQ-PARTICIPANT",
                `RSVP=TRUE:mailto:${email}`
              ].join(";")
            );
          }
        });
      innerEvent.endTime && body.push(`DTEND:${formatDate(innerEvent.endTime)}`);
      innerEvent.description && body.push(`DESCRIPTION:${innerEvent.description}`);
      innerEvent.location && body.push(`LOCATION:${innerEvent.location}`);
      
      if(Array.isArray(rawContent)) {
        typeof rawContent[i] !== 'undefined' && rawContent[i] && body.push(rawContent[i]);
      } else {
        rawContent && i === 0 && body.push(rawContent);
      }
    
      body.push("END:VEVENT");
  });

  const url = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    body.join("\n"),
    "END:VCALENDAR"
  ].join("\n");

  if (useDataURL) {
    return encodeURI(`data:text/calendar;charset=utf8,${url}`);
  } else {
    return url;
  }
}

export function downloadBlob(blob: object, filename: string): void {
  const linkEl = document.createElement("a");
  linkEl.href = window.URL.createObjectURL(blob);
  linkEl.setAttribute("download", filename);
  document.body.appendChild(linkEl);
  linkEl.click();
  document.body.removeChild(linkEl);
}

export function isCrappyIE(): boolean {
  return !!(
    typeof window !== "undefined" &&
    window.navigator.msSaveOrOpenBlob &&
    window.Blob
  );
}

export function isIOSSafari(): boolean {
  const ua = window.navigator.userAgent;
  const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
  const webkit = !!ua.match(/WebKit/i);

  return iOS && webkit && !ua.match(/CriOS/i);
}

export function isIOSChrome(): boolean {
  const ua = window.navigator.userAgent;
  const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);

  return iOS && !!ua.match(/CriOS/i);
}
