import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-censorship-small',
  templateUrl: './censorship-small.component.html',
  styleUrls: ['./censorship-small.component.scss']
})
export class CensorshipSmallComponent implements OnInit {
  @Input() public age?: Number | string;

  @Input() forPlayer: boolean;

  constructor() {
    this.age = '0';
    this.forPlayer = false;
  }

  ngOnInit(): void {
    if (typeof this.age === 'number') {
      this.age = this.age.toString();
    }
  }
}
