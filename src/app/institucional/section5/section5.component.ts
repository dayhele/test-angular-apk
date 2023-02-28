import { Theme } from 'src/assets/theme/theme';
import { PlansService } from 'src/app/shared/services/plans.service';
import { Component, OnInit } from '@angular/core';
import { CheckDeviceService } from 'src/app/shared/services/check-device.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-section5',
  templateUrl: './section5.component.html',
  styleUrls: ['./section5.component.scss']
})
export class Section5Component implements OnInit {
  public plans: any[] = [];
  public openedChannelsDropdown: boolean = true;
  public specialChannelsDropdown: boolean = false;
  public onDemandDropdown: boolean = false;
  public checkMobile: boolean = false;
  public environment: any = environment;

  constructor(
    private plansService: PlansService,
    public theme: Theme,
    private checkDevice: CheckDeviceService,
    private route: Router
  ) {
    this.checkMobile = this.checkDevice.isMobile();
    this.environment = environment;
  }

  ngOnInit() {
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
        plan.active = false;
      });

      this.plans[2].active = true;
    });
  }

  planSelected(plan: any): void {
    sessionStorage.setItem('selected_plan', JSON.stringify(plan));
    sessionStorage.setItem('selected_planId', plan.planId!.toString());

    this.route.navigateByUrl('/login/cadastro');
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
