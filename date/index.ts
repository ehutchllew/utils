import { formatErrorString } from "../common";

export class DateUtil {
  public static readonly iso8601Regex =
    /(?<year>\d{4})-?(?<month>\d{2})-?(?<day>\d{2})(?:T?(?<hour>\d{2}):?(?<minute>\d{2}):?(?:(?<second>\d{2})(?<milliseconds>\.\d{3})?)(?:(?<z>Z)?|(?<offset>[+-])(?<hourOffset>\d{2}):?(?<minuteOffset>\d{2})?)$)?/i;

  private constructor() {
    throw new Error("DateUtil is a static class and cannot be instantiated");
  }

  public static convertDateToJavascriptISO(date: string): string {
    const jsCompliantDateNum = new Date(date);
    if (jsCompliantDateNum.valueOf()) return jsCompliantDateNum.toISOString();

    const isDateValid = DateUtil.isValidDate(date);
    if (!isDateValid) {
      formatErrorString("date", date, "ISO 8601 Date String");
    }

    try {
      const captureGroups = DateUtil.iso8601Regex.exec(date)?.groups;
      if (!captureGroups) {
        throw new Error("Unable to parse capture groups");
      }

      // Extracting capture group fields from named capture groups in the static iso8601Regex property above.
      const {
        day,
        month,
        year,
        hour,
        minute,
        second,
        offset,
        hourOffset,
        minuteOffset,
        z,
      } = captureGroups;
      let timezoneStringBuilder = z ? z : "";
      if (offset) {
        const minuteOffsetSuffix = minuteOffset ? `:${minuteOffset}` : "";
        timezoneStringBuilder = `${offset}${hourOffset}${minuteOffsetSuffix}`;
      }
      return `${year}-${month}-${day}T${hour}:${minute}:${second}${timezoneStringBuilder}`;
    } catch (e) {
      throw new Error(
        "Tried to convert date string to JS ISO string, but something went wrong:::" +
          JSON.stringify({ error: e, originalDateArgument: date })
      );
    }
  }

  public static isValidDate(date: string): boolean {
    return DateUtil.iso8601Regex.test(date);
  }
}
