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
  event: ICalEvent,
  useDataURL: boolean = false,
  rawContent: string = ""
): string {
  const body: string[] = [];

  body.push(`URL:${event.url || document.URL}`);
  body.push(`DTSTART:${formatDate(event.startTime)}`);
  body.push(`SUMMARY:${event.title}`);
  event.attendees && event.attendees.forEach(attendee => {
    const regExp = /^([^<]+)\s*<(.+)>/;
    const matches = attendee.match(regExp);
    if (matches) {
      const name = matches[1];
      const email = matches[2];
      body.push([
        'ATTENDEE',
        `CN=${name}`,
        'CUTYPE=INDIVIDUAL',
        'PARTSTAT=NEEDS-ACTION',
        'ROLE=REQ-PARTICIPANT',
        `RSVP=TRUE:mailto:${email}`
      ].join(';'));
    };
  });
  event.endTime && body.push(`DTEND:${formatDate(event.endTime)}`);
  event.description && body.push(`DESCRIPTION:${event.description}`);
  event.location && body.push(`LOCATION:${event.location}`);
  rawContent && body.push(rawContent);

  const url = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    body.join("\n"),
    "END:VEVENT",
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
