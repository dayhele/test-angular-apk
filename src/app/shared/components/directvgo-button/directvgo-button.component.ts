import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-directvgo-button',
  templateUrl: './directvgo-button.component.html',
  styleUrls: ['./directvgo-button.component.scss']
})
export class DirectvgoButtonComponent {
  @Input() href: string = '';

  constructor() {}
}
