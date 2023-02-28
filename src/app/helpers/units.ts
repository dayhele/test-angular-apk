export class Units {
  static zeroPointPixel = 120;
  static totalPixelOfOneHour = 600;

  public static convertMinuteToPixel(minute: number) {
    return (minute * Units.totalPixelOfOneHour) / 60;
  }
}
