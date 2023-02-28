export class Validate {
  public static nonEmptyString(value: string): boolean {
    if (value !== '' || value) {
      return true;
    }
    return false;
  }
}
