export class Device {
  public static screenX = window.innerWidth;

  public static isMobile(): boolean {
    return this.screenX <= 768 || this.mobileCheck()
  }

  public static mobileCheck() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

}
