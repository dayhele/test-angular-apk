import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { ChannelModal } from '../../interfaces/channels-modal';
import { environment } from 'src/environments/environment';
import { getActivePlan, renderChannelsByPlan, filterChannelsByPlan } from 'src/utils/menuPlans';
import { MenuPlan } from '../../interfaces/plan';

@Component({
  selector: 'app-modal-channels',
  templateUrl: './modal-channels.component.html',
  styleUrls: ['./modal-channels.component.scss']
})
export class ModalChannelsComponent implements OnInit {
  @Input() public channels: ChannelModal[] = [];
  @Input() public plans: MenuPlan[] = [];
  public environment = environment;

  constructor() {}

  ngOnInit(): void {
    const activePlan = getActivePlan(this.plans);
    renderChannelsByPlan('#containerChannels .modal .modal--content--channels', activePlan, this.channels);
  }

  public closeModal(): void {
    document.getElementById('containerChannels')!.classList.remove('active');
  }

  public filterChannelsBySelectedPlan(planId: number) {
    filterChannelsByPlan(this.plans, planId, '#containerChannels .modal .modal--content--channels', this.channels);
  }
}
