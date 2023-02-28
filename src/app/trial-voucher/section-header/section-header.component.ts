import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CheckDeviceService } from 'src/app/shared/services/check-device.service';
import { environment } from 'src/environments/environment';
import { Theme } from 'src/assets/theme/theme';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss']
})
export class SectionHeaderComponent{
  public environment: any;
  public checkMobile: boolean = false;
  @Input() public daysFree: string = '30';

  constructor(
    private checkDevice: CheckDeviceService,
    private router: Router,
    public theme: Theme
  ) {
    this.environment = environment;
    this.checkMobile = this.checkDevice.isMobile();
  }


  public goToPlans(): void {
    this.router.navigateByUrl('/login/voucher');
  }
}
