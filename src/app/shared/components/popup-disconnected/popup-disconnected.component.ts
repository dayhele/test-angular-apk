import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-popup-disconnected',
  templateUrl: './popup-disconnected.component.html',
  styleUrls: ['./popup-disconnected.component.scss']
})
export class PopupDisconnectedComponent {
  @Input() public showPopupLogged: boolean;

  constructor(private route: Router) {
    this.showPopupLogged = false;
  }

  public goTo(): void {
    this.route.navigateByUrl('/profile/select');
    this.showPopupLogged = false;
  }
}
