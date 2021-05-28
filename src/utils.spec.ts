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
    it("should throw error when both the required fields are missing", () => {
      // @ts-ignore
      expect(() => buildUrl({ title: "Should fail" })).toThrow();
    });
    it("should return basic iCalendar string when startTime and title fields are provided", () => {
      const title = "Something great";
      const startTime = "2018-10-07T10:30:00+10:00";
      const result = buildUrl({ title, startTime });
      expect(result).toBe(
        [
          "BEGIN:VCALENDAR",
          "VERSION:2.0",
          "BEGIN:VEVENT",
          `DTSTART:${formatDate(startTime)}`,
          `SUMMARY:${title}`,
          "END:VEVENT",
          "END:VCALENDAR"
        ].join("\n")
      );
    });
  });
});
