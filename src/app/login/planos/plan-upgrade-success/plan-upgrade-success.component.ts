import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CheckDeviceService } from 'src/app/shared/services/check-device.service';

@Component({
  selector: 'app-plan-upgrade-success',
  templateUrl: './plan-upgrade-success.component.html',
  styleUrls: ['./plan-upgrade-success.component.scss']
})
export class PlanUpgradeSuccessComponent {

  public checkMobile: boolean = false;

  constructor(
    private router: Router,
    private checkDevice: CheckDeviceService,
    ) {
    this.checkMobile = this.checkDevice.isMobile();
  }

  public goToHome(): void {
    this.router.navigateByUrl('/home');
  }
}
