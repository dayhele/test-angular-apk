import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-section7',
  templateUrl: './section7.component.html',
  styleUrls: ['./section7.component.scss']
})
export class Section7Component {

  @Input() public daysFree: string = '30';

  constructor() {}

}
