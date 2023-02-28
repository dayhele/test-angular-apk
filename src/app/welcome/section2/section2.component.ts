import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-section2',
  templateUrl: './section2.component.html',
  styleUrls: ['./section2.component.scss']
})
export class Section2Component implements OnInit {
  public sectionChannels: any[] = [];

  constructor() {}

  ngOnInit(): void {
    for (let i = 1; i <= 53; i++) {
      this.sectionChannels.push({
        white: `assets/welcome/channels/${i}.svg`
      });
    }
  }
}
