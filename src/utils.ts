export interface ICalEvent {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
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
  useDataURL: boolean = false
): string {
  const url = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    "URL:" + document.URL,
    "DTSTART:" + formatDate(event.startTime),
    "DTEND:" + formatDate(event.endTime),
    "SUMMARY:" + event.title,
    "DESCRIPTION:" + event.description,
    "LOCATION:" + event.location,
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
