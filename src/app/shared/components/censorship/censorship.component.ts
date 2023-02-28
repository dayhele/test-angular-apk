import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-censorship',
  templateUrl: './censorship.component.html',
  styleUrls: ['./censorship.component.scss']
})
export class CensorshipComponent implements OnInit {
  @Input() public age?: Number | string;
  @Input() forPlayer: boolean;

  constructor() {
    this.forPlayer = false;
    this.age = '0';
  }

  ngOnInit(): void {
    if (typeof this.age === 'number') {
      this.age = this.age.toString();
    }
  }
}
