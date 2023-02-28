import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-welcome-carousel',
  templateUrl: './welcome-carousel.component.html',
  styleUrls: ['./welcome-carousel.component.scss']
})
export class WelcomeCarouselComponent {
  public environment: any;

  constructor() {
    this.environment = environment;
  }
}
