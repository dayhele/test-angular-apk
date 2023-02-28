import { PlansService } from './../../../shared/services/plans.service';
import { Plan } from './../../../shared/interfaces/plan';
import { AccountService } from './../../../shared/services/account.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { Theme } from 'src/assets/theme/theme';
import { environment } from 'src/environments/environment';
import { CheckDeviceService } from 'src/app/shared/services/check-device.service';

@Component({
  selector: 'app-plan-upgrade',
  templateUrl: './plan-upgrade.component.html',
  styleUrls: ['./plan-upgrade.component.scss']
})
export class PlanUpgradeComponent implements OnInit {
  @Output() public cancelChange = new EventEmitter<boolean>();
  @Input() public cancel = false;
  @Input() public isChangingPlan: boolean = true;
  @Input() public plan?: any = {};
  @Input() public isVoucher: boolean = false;

  public modalOpen: boolean = false;
  public planName: string = '';
  public planos: any = [];
  public showConfirmation: boolean = false;
  public newPlanPrice: number = 0;
  public currentPlanPriceStr: string = '';
  public currentPlanPrice: number = 0;
  public currentPlan: string = '';
  public hasError: boolean = false;
  public errorMessage: string = '';
  public environment: any;
  public checkMobile: boolean = false;


  constructor(
    private accountService: AccountService,
    private planService: PlansService,
    public theme: Theme,
    private checkDevice: CheckDeviceService,
  ) {
    this.environment = environment;
    this.checkMobile = this.checkDevice.isMobile();
  }

  ngOnInit(): void {
    this.getSubscription();
    this.getCurrentPlan();
    this.getNewPlanPrice();
  }

  public getSubscription(): void {
    this.accountService.getAccountSubscribes().subscribe((data) => {
      this.planos = data;
    });
  }

  public getCurrentPlan(): void {
    this.planService.getCurrentPlan().subscribe((data) => {
      this.currentPlan = data.Result.titulo_plano;
      this.currentPlanPrice = parseFloat(data.Result.preco);
    });
  }

  public confirmChanges(): void {
    if (this.plan) {
      this.planService.changePlan(this.plan.planId!).subscribe(
        (res) => {
          if (res.success) this.showConfirmation = true;
        },
        (err) => {
          this.hasError = true;
          this.errorMessage = err.error.errorMessage;
        }
      );
    }
  }

  public getNewPlanPrice(): void {
    if (this.plan) {
      this.newPlanPrice = this.plan.planPrice;
    }
  }

  public cancelling(): void {
    this.cancelChange.emit(false);
  }
}
