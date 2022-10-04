import { describe, it } from "@jest/globals";
import { buildUrl, formatDate } from "./utils";

describe("utils", () => {
  describe("formatDate", () => {
    it("should format provided date string to the UTC time", () => {
      // Reference: https://www.kanzaki.com/docs/ical/dateTime.html
      const result = formatDate("2018-10-07T10:30:00+10:00");
      expect(result).toBe("20181007T003000Z");
    });
  });
  describe("buildUrl", () => {
    const buildICalMessage = (
      title: string,
      startTime: string,
      body?: string
    ) => {
      return [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "BEGIN:VEVENT",
        `DTSTART:${formatDate(startTime)}`,
        `SUMMARY:${title}`,
        body,
        "END:VEVENT",
        "END:VCALENDAR"
      ]
        .filter(str => Boolean(str))
        .join("\n");
    };
    
    const buildICalMessageMultiple = (
      title1: string,
      title2: string,
      startTime1: string,
      startTime2: string
    ) => {
      return [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "BEGIN:VEVENT",
        `DTSTART:${formatDate(startTime1)}`,
        `SUMMARY:${title1}`,
        "END:VEVENT",
        "BEGIN:VEVENT",
        `DTSTART:${formatDate(startTime2)}`,
        `SUMMARY:${title2}`,
        "END:VEVENT",
        "END:VCALENDAR"
      ]
        .filter(str => Boolean(str))
        .join("\n");
    };

    it("should throw error when both the required fields are missing", () => {
      // @ts-ignore
      expect(() => buildUrl({ title: "Should fail" })).toThrow();
    });
    it("should return basic iCalendar string when startTime and title fields are provided", () => {
      const title = "Something great";
      const startTime = "2018-10-07T10:30:00+10:00";
      const result = buildUrl({ title, startTime });
      expect(result).toBe(buildICalMessage(title, startTime));
    });
    it("should return iCalendar string with multiple events when array of events is provided", () => {
      const title1 = "Event 1";
      const title2 = "Event 2";
      const startTime1 = "2018-10-07T10:30:00+10:00";
      const startTime2 = "2018-10-07T12:30:00+10:00";
      const result = buildUrl(
        [
          { title1, startTime1 },
          { title2, startTime2 }
        ]
      );
      expect(result).toBe(buildICalMessageMultiple(title1, title2, startTime1, startTime2));
    });
    it("should include attendees in the iCalendar when the info is provided", () => {
      const title = "Something great";
      const startTime = "2018-10-07T10:30:00+10:00";
      const attendees = ["Hello World<hello@world.com>", "Hey <hey@test.com>"];
      const result = buildUrl({ title, startTime, attendees });
      const body = [
        [
          "ATTENDEE",
          "CN=Hello World",
          "CUTYPE=INDIVIDUAL",
          "PARTSTAT=NEEDS-ACTION",
          "ROLE=REQ-PARTICIPANT",
          "RSVP=TRUE:mailto:hello@world.com"
        ].join(";"),
        [
          "ATTENDEE",
          "CN=Hey ",
          "CUTYPE=INDIVIDUAL",
          "PARTSTAT=NEEDS-ACTION",
          "ROLE=REQ-PARTICIPANT",
          "RSVP=TRUE:mailto:hey@test.com"
        ].join(";")
      ].join("\n");

      expect(result).toBe(buildICalMessage(title, startTime, body));
    });
  });
});
