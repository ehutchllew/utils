import { formatErrorString } from "../common";

export class ZipCodeUtil {
  public static readonly zipCodeRegex = /(?:(?<zip>^\d{5})(-?\d{4})?)$/i;

  private constructor() {
    throw new Error("ZipCodeUtil is a static class and cannot be instantiated");
  }

  public static convertToZipCodeFive(code: string): string {
    if (!ZipCodeUtil.isValidZipCode(code)) {
      formatErrorString("zipcode", code, "A valid Zip or Zip4+ string");
    }

    try {
      const captureGroups = ZipCodeUtil.zipCodeRegex.exec(code)?.groups;
      if (!captureGroups) {
        throw new Error("Unable to parse capture groups");
      }

      const { zip } = captureGroups;
      if (!zip) {
        throw new Error("Unable to parse first 5 characters of zipcode string");
      }

      return zip;
    } catch (e) {
      throw new Error(
        "Tried to convert zipcode string to 5 char zipcode, but something went wrong:::" +
          JSON.stringify({
            error: e,
            originalZipCodeArgument: code,
          })
      );
    }
  }

  public static isValidZipCode(code: string): boolean {
    return ZipCodeUtil.zipCodeRegex.test(code);
  }
}
