import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-exclusive-content',
  templateUrl: './exclusive-content.component.html',
  styleUrls: ['./exclusive-content.component.scss']
})
export class ExclusiveContentComponent {
  public environment: any;

  constructor() {
    this.environment = environment;
  }
}
