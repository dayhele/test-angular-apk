import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-rent-mobile-popup',
  templateUrl: './rent-mobile-popup.component.html',
  styleUrls: ['./rent-mobile-popup.component.scss']
})
export class RentMobilePopupComponent {
  @Output() closeEvent = new EventEmitter();

  constructor() {}

  public closePopup() {
    this.closeEvent.emit('close');
  }
}
