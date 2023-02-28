import { Theme } from 'src/assets/theme/theme';
import { PlansService } from 'src/app/shared/services/plans.service';
import { Component, OnInit } from '@angular/core';
import { CheckDeviceService } from 'src/app/shared/services/check-device.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { Plan } from 'src/app/shared/interfaces/plan';
import { AccountInfoService } from 'src/app/shared/services/account-info.service';
import { ChangePlanService } from 'src/app/shared/services/change-plan.service';

@Component({
  selector: 'app-section-planos',
  templateUrl: './section-planos.component.html',
  styleUrls: ['./section-planos.component.scss']
})
export class SectionPlanosComponent implements OnInit {
  public plans: any[] = [];
  public openedChannelsDropdown: boolean = false;
  public specialChannelsDropdown: boolean = false;
  public onDemandDropdown: boolean = false;
  public checkMobile: boolean = false;
  public environment: any = environment;
  public currentPlan: number = 0;
  public isVoucher: boolean = false;
  public selectedPlan?: Plan;
  public isChangingPlan: boolean = false;
  public planos: any[] = [];

  constructor(
    private plansService: PlansService,
    public theme: Theme,
    private checkDevice: CheckDeviceService,
    private route: Router,
    private actRoute: ActivatedRoute,
    public accountInfoService: AccountInfoService,
    private ChangePlanService: ChangePlanService,
  ) {
    this.checkMobile = this.checkDevice.isMobile();
    this.environment = environment;
  }

  ngOnInit() {
    this.getCurrentPlan();
    this.getAccountInfo();
    this.plansService.getPlans().subscribe((data) => {
      var planos = data.filter((d)=>{
        if(d.planStatus){
          if(d.planStatus == 'active'){
            return true;
          }
        }
        return false;
      });
      
      this.plans = planos;

      if (this.theme.planos.reverse) this.plans.reverse();

      this.selectCard(this.plans[2]);

      this.plans.forEach((plan) => {
        if(plan.planId == this.currentPlan) plan.active = true;
        else plan.active = false;
        if(plan.discountPlanPrice == null) plan.discountPlanPrice = 0;
      });

      this.plans[1].active = true;
    });

    this.actRoute.paramMap.subscribe((params) => {
      if (params.get('voucher')) this.isVoucher = true;

      if (this.isVoucher) {
        this.selectedPlan = JSON.parse(
          sessionStorage.getItem('selected_plan')!
        );
        this.ChangePlanService.setIsChangingPlan(true,this.selectedPlan);
      }
    });
  }

  getCurrentPlan(): void {
    this.plansService.getCurrentPlan().subscribe((data) => {
      this.currentPlan = data.Result.id_plano;
    });

  }

  getAccountInfo() {
    this.accountInfoService.AccountInfo().subscribe((data) => {
      if (data.success?.data?.subscription_type === 'voucher')
        this.isVoucher = true;
    });
  }


  planSelected(plan: any): void {
    sessionStorage.setItem('selected_plan', JSON.stringify(plan));

    sessionStorage.setItem('selected_planId', plan.planId!.toString());

    if (this.isVoucher) {
      this.route.navigateByUrl(`/pagamento/voucher/${plan.planId}`);
      return;
    }

    this.selectedPlan = plan;
    this.ChangePlanService.setIsChangingPlan(true,plan);


  }

  selectCard(planSelected: any) {
    let index = this.plans.findIndex(
      (plan) => planSelected.planId == plan.planId
    );

    if (this.checkMobile) {
      this.plans.forEach((plan) => {
        plan.active = false;
      });

      planSelected.active = true;
    }

    this.plans[index].index = 1;

    for (let i = 1; i <= this.plans.length - 1; i++) {
      if (index + i < this.plans.length) this.plans[index + i].index = i + 1;
      else this.plans[index + i - this.plans.length].index = i + 1;
    }
  }
}
