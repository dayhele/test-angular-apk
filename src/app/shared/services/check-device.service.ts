import { Injectable } from '@angular/core';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { Plugins } from '@capacitor/core';
const { Device } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class CheckDeviceService {
  constructor(private deviceDetector: DeviceDetectorService) {}

  public isMobile(): boolean {
    return this.deviceDetector.isMobile() || this.deviceDetector.isTablet();
  }

  public isTablet(): boolean {
    return this.deviceDetector.isTablet();
  }
}
