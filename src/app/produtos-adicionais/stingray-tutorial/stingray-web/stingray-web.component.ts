import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-stingray-web',
  templateUrl: './stingray-web.component.html',
  styleUrls: ['./stingray-web.component.scss']
})
export class StingrayWebComponent {
  public environment: any;

  constructor() {
    this.environment = environment;
  }
}
