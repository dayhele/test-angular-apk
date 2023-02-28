import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-bubble',
  templateUrl: './info-bubble.component.html',
  styleUrls: ['./info-bubble.component.scss']
})
export class InfoBubbleComponent {
  @Input() public bubbleMessage: string = '';
  @Input() public bubbleTicketText: string = '';
}
