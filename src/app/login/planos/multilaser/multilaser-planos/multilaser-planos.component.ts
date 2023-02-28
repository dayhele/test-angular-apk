import { AccountInfoService } from './../../../../shared/services/account-info.service';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { PlansService } from 'src/app/shared/services/plans.service';
import { MenuPlan, Plan } from './../../../../shared/interfaces/plan';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChannelModal } from 'src/app/shared/interfaces/channels-modal';
import SwiperCore, { Navigation } from 'swiper';
import { Theme } from 'src/assets/theme/theme';
import { CheckDeviceService } from 'src/app/shared/services/check-device.service';
import { ChangePlanService } from 'src/app/shared/services/change-plan.service';

SwiperCore.use([Navigation]);

@Component({
  selector: 'app-planos',
  templateUrl: './multilaser-planos.component.html',
  styleUrls: ['./multilaser-planos.component.scss']
})
export class MultilserPlanosComponent implements OnInit {
  public isChangingPlan: boolean = false;
  public isVoucher: boolean = false;
  public isLoading: boolean = true;

  public logged: boolean = false;

  public currentPlan: number = 0;
  public plans: Plan[] = [];
  public selectedPlan?: Plan;

  public channels: ChannelModal[] = [];
  public channelsLoaded: boolean = false;
  public checkMobile: boolean = this.checkDevice.isMobile();

  public menuPlans: MenuPlan[] = [
    {
      id: 1,
      title: 'Multi + Light',
      active: true,
      channelsContained: [
        1496, 1499, 1498, 1497, 1500, 1501, 1473, 1521, 1474, 1461, 1504, 1462,
        1463, 1475, 1520, 1518, 1460, 1465, 1511, 1510, 1481, 1478, 1489, 1479,
        1463, 1490, 1491, 1492, 1493, 1494, 1495, 1484, 1485, 1486, 1487, 1488,
        1464, 1513, 1557
      ]
    },
    {
      id: 2,
      title: 'Multi + Família',
      active: false,
      channelsContained: [
        1496, 1499, 1498, 1497, 1500, 1501, 1473, 1521, 1474, 1461, 1504, 1462,
        1463, 1475, 1520, 1518, 1460, 1465, 1511, 1510, 1481, 1478, 1489, 1479,
        1463, 1490, 1491, 1492, 1493, 1494, 1495, 1484, 1485, 1486, 1487, 1488,
        1517, 1502, 1464, 1513, 1557
      ]
    },
    {
      id: 3,
      title: 'Multi + Pipoca',
      active: false,
      channelsContained: [
        1496, 1499, 1498, 1497, 1500, 1501, 1473, 1521, 1474, 1461, 1504, 1462,
        1463, 1475, 1520, 1518, 1460, 1465, 1511, 1510, 1481, 1478, 1489, 1479,
        1463, 1490, 1491, 1492, 1493, 1494, 1495, 1484, 1485, 1486, 1487, 1488,
        1517, 1502, 1509, 1472, 1482, 1483, 1468, 1464, 1513, 1557
      ]
    },
    {
      id: 4,
      title: 'Multi + Ao Vivo',
      active: false,
      channelsContained: [
        1496, 1499, 1498, 1497, 1500, 1501, 1473, 1521, 1474, 1461, 1504, 1462,
        1463, 1475, 1520, 1518, 1460, 1465, 1511, 1510, 1481, 1478, 1489, 1479,
        1463, 1490, 1491, 1492, 1493, 1494, 1495, 1484, 1485, 1486, 1487, 1488,
        1517, 1502, 1509, 1472, 1482, 1483, 1468, 1480, 1470, 1466, 1471, 1512,
        1468, 1469, 1528, 1467, 1544, 1464, 1513, 1557
      ]
    },
    {
      id: 5,
      title: 'Multi + Full',
      active: false,
      channelsContained: [
        1496, 1499, 1498, 1497, 1500, 1501, 1473, 1521, 1474, 1461, 1504, 1462,
        1463, 1475, 1520, 1518, 1460, 1465, 1511, 1510, 1481, 1478, 1489, 1479,
        1463, 1490, 1491, 1492, 1493, 1494, 1495, 1484, 1485, 1486, 1487, 1488,
        1517, 1502, 1509, 1472, 1482, 1483, 1468, 1480, 1470, 1466, 1471, 1512,
        1468, 1469, 1528, 1467, 1544, 1464, 1513, 1557
      ]
    }
  ];

  constructor(
    private route: Router,
    private actRoute: ActivatedRoute,
    private plansService: PlansService,
    private profileService: ProfileService,
    public theme: Theme,
    public accountInfoService: AccountInfoService,
    private checkDevice: CheckDeviceService,
    private ChangePlanService: ChangePlanService,
  ) {}

  ngOnInit(): void {
    this.ChangePlanService.eventChangePlan.subscribe(
      event => this.setChangingPlan(event)
    );
    this.getPlans();
    this.getChannels();
    this.getCurrentPlan();
    this.getAccountInfo();

    const isLogged = parseInt(this.profileService.selectedProfile);

    if (isLogged) this.logged = true;

    sessionStorage.removeItem('voucher');

    this.actRoute.paramMap.subscribe((params) => {
      if (params.get('voucher')) this.isVoucher = true;

      if (this.isVoucher) {
        this.selectedPlan = JSON.parse(
          sessionStorage.getItem('selected_plan')!
        );
        this.isChangingPlan = this.ChangePlanService.getIsChangingPlan();
      }
    });
  }

  public setChangingPlan(value: boolean) {
    this.selectedPlan = this.ChangePlanService.getNewPlan();

    this.isChangingPlan = value;
  }

  public getPlanActive() {
    return this.menuPlans.find((plan) => plan.active);
  }

  public getPlans(): void {
    this.plansService.getPlans().subscribe((data) => {
      this.plans = data;

      this.plans.sort((a, b) =>
        Number(a.planPrice!) > Number(b.planPrice!) ? 1 : -1
      );

      this.isLoading = false;
    });
  }

  public getAccountInfo() {
    this.accountInfoService.AccountInfo().subscribe((data) => {
      if (data.success?.data?.subscription_type === 'voucher')
        this.isVoucher = true;
    });
  }

  public getCurrentPlan(): void {
    this.plansService.getCurrentPlan().subscribe((data) => {
      this.currentPlan = data.Result.id_plano;
    });
  }

  public selectPlan(plan: Plan): void {
    sessionStorage.setItem('selected_plan', JSON.stringify(plan));

    sessionStorage.setItem('selected_planId', plan.planId!.toString());

    if (!this.logged) this.route.navigateByUrl('/login/cadastro');

    if (this.isVoucher) {
      this.route.navigateByUrl(`/pagamento/voucher/${plan.planId}`);
      return;
    }

    this.selectedPlan = plan;
    this.isChangingPlan = true;
  }

  public modalChannels(): void {
    document.getElementById('containerChannels')!.classList.add('active');
  }

  public getChannels(): void {
    this.plansService.getChannelsOff().subscribe((data) => {
      this.channels = data;
      this.channelsLoaded = true;
    });
  }

  public closeModal(): void {
    document.getElementById('containerChannels')!.classList.remove('active');
  }
}
