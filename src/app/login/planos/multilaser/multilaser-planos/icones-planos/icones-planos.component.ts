import { Component, Input, OnInit } from '@angular/core';
import { ChannelModal } from 'src/app/shared/interfaces/channels-modal';
import { MenuPlan } from 'src/app/shared/interfaces/plan';
import { filterChannelsByPlan, getActivePlan, renderChannelsByPlan } from 'src/utils/menuPlans';

@Component({
  selector: 'app-icones-planos',
  templateUrl: './icones-planos.component.html',
  styleUrls: ['./icones-planos.component.scss']
})
export class IconesPlanosComponent implements OnInit {
  @Input() public channels: ChannelModal[] = [];
  @Input() public plans: MenuPlan[] = [];
  public openPlans: boolean = false;

  constructor() {}

  ngOnInit(): void {
    const activePlan = getActivePlan(this.plans);
    renderChannelsByPlan('#mobile-modal .modal .modal--content--channels', activePlan, this.channels);
  }

  public filterChannelsBySelectedPlan(planId: number) {
    filterChannelsByPlan(this.plans, planId, '#mobile-modal .modal .modal--content--channels', this.channels);
  }
}
