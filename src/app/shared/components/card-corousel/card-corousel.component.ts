import { Component, Input, OnInit } from '@angular/core';
import { ChannelModal } from '../../interfaces/channels-modal';

@Component({
  selector: 'app-card-corousel',
  templateUrl: './card-corousel.component.html',
  styleUrls: ['./card-corousel.component.scss']
})
export class CardCorouselComponent {
  @Input() public channel!: ChannelModal;
}
