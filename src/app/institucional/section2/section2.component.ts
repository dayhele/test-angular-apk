import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-section2',
  templateUrl: './section2.component.html',
  styleUrls: ['./section2.component.scss']
})
export class Section2Component {
  public environment: any;

  constructor() {
    this.environment = environment;
  }
}
