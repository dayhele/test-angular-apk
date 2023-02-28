import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss']
})
export class ChipComponent {
  @Input() public text: string;
  @Input() public color: string;

  constructor() {
    this.text = '';
    this.color = '#3D3D3F';
  }
}
