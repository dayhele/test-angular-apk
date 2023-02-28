import { Component, HostListener, OnInit } from '@angular/core';
import { Theme } from 'src/assets/theme/theme';
import { environment } from 'src/environments/environment';
import { CheckDeviceService } from '../../services/check-device.service';

@Component({
  selector: 'app-toast-download-app',
  templateUrl: './toast-download-app.component.html',
  styleUrls: ['./toast-download-app.component.scss']
})
export class ToastDownloadAppComponent implements OnInit {
  public toastExists: boolean = false;
  public scrollPosition: number = 0;
  public tabletCheck?: boolean = undefined;

  @HostListener('window: scroll', ['$event'])
  public onScroll() {
    this.scrollPosition = window.scrollY;
  }

  constructor(
    public checkDeviceService: CheckDeviceService,
    public theme: Theme
  ) {}

  ngOnInit(): void {
    if (this.checkDeviceService.isMobile() && !environment.app) {
      this.toastExists = true;
    }

    this.tabletCheck = this.checkDeviceService.isTablet();
  }

  public closeToast(): void {
    this.toastExists = false;
  }

  public openAppLink(): void {
    window.location.href = this.theme.deepLink;
  }
}
