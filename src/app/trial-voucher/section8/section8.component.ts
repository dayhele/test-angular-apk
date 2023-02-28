import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CheckDeviceService } from 'src/app/shared/services/check-device.service';

@Component({
  selector: 'app-section8',
  templateUrl: './section8.component.html',
  styleUrls: ['./section8.component.scss']
})
export class Section8Component {
  public checkMobile: boolean = false;
  public checkTablet: boolean = false;

  @Input() public daysFree: string = '30';

  constructor(
    private checkDevice: CheckDeviceService,
    private router: Router,
    ) {
    this.checkMobile = this.checkDevice.isMobile();
    this.checkMobile = this.checkDevice.isTablet();
  }

  public goToPlans(): void {
    this.router.navigateByUrl('/login/voucher');
  }
}
