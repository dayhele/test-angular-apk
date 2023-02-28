import { Component, Input } from '@angular/core';
import { Theme } from 'src/assets/theme/theme';

@Component({
  selector: 'app-whatsapp-button',
  templateUrl: './whatsapp-button.component.html',
  styleUrls: ['./whatsapp-button.component.scss']
})
export class WhatsappButtonComponent {
  @Input() public isLargeButton: boolean = false;
  @Input() public notFixed: boolean = false;
  @Input() public mini: boolean = false;

  constructor(public theme: Theme) {}
}
