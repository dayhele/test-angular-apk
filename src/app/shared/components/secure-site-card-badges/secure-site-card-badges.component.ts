import { Component, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-secure-site-card-badges',
  templateUrl: './secure-site-card-badges.component.html',
  styleUrls: ['./secure-site-card-badges.component.scss']
})
export class SecureSiteCardBadgesComponent {
  @Input() hideBrands: boolean = false;
  public environment: any;

  constructor() {
    this.environment = environment;
  }
}
