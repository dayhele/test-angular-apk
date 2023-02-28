import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PlansService } from '../../shared/services/plans.service';
import { Plan } from './../../shared/interfaces/plan';
import { ChannelModal } from 'src/app/shared/interfaces/channels-modal';
import SwiperCore, { Navigation, Swiper } from 'swiper';
import { Theme } from 'src/assets/theme/theme';
import { AccountInfoService } from 'src/app/shared/services/account-info.service';

SwiperCore.use([Navigation]);

@Component({
  selector: 'app-planos',
  templateUrl: './planos.component.html',
  styleUrls: ['./planos.component.scss']
})
export class PlanosComponent implements OnInit {
  public plans: Plan[];
  public isLoading: boolean;
  public channels: ChannelModal[];
  public channelsLoaded: boolean;
  public isVoucher: boolean = false;

  constructor(
    private plansService: PlansService,
    private route: Router,
    public theme: Theme,
    public accountInfoService: AccountInfoService
  ) {
    this.isLoading = true;
    this.plans = [];
    this.channels = [];
    this.channelsLoaded = false;
    if (this.theme.client != 'watch') {
      this.route.navigate(['planos', this.theme.clientRoute]);
    } else {
      window.open('https://watchbr.com.br/assinante/');
    }
  }
  ngOnInit(): void {
    sessionStorage.removeItem('selected_planId');
    sessionStorage.removeItem('voucher');

    this.getPlans();
    this.getChannels();
    this.getAccountInfo();
  }

  public getPlans(): void {
    this.plansService.getPlans().subscribe((data) => {
      this.plans = data;
      if (this.theme.planos.reverse) this.plans.reverse();
      this.isLoading = false;
    });
  }

  public selectPlan(plan: Plan): void {
    sessionStorage.setItem('selected_plan', JSON.stringify(plan));

    sessionStorage.setItem('selected_planId', plan.planId!.toString());

    if (this.isVoucher) {
      this.route.navigateByUrl(`/pagamento/voucher/${plan.planId}`);
      return;
    }

    this.route.navigateByUrl('/login/cadastro');
  }

  public getAccountInfo() {
    this.accountInfoService.AccountInfo().subscribe((data) => {
      if (data.success?.data?.subscription_type === 'voucher')
        this.isVoucher = true;
    });
  }

  public modalChannels(): void {
    document.getElementById('containerChannels')!.classList.add('active');
  }

  public getChannels(): void {
    this.plansService.getChannels().subscribe((data) => {
      this.channels = data.list;
      this.channelsLoaded = true;
    });
  }

  public closeModal(): void {
    document.getElementById('containerChannels')!.classList.remove('active');
  }
}
