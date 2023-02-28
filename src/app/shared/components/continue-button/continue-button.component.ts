import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-continue-button',
  templateUrl: './continue-button.component.html',
  styleUrls: ['./continue-button.component.scss']
})
export class ContinueButtonComponent {
  @Output() public clickEvent = new EventEmitter();

  public environment: any;
  public icon: string;

  constructor() {
    this.icon = `${environment.imageService}/icons/button/play-icon.svg`;
  }

  public click(): void {
    this.clickEvent.emit();
  }
}
