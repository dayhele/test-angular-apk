import { Component, Input, OnInit } from '@angular/core';
import { PhaseList } from 'src/app/shared/interfaces/matches';

@Component({
  selector: 'app-phases',
  templateUrl: './phases.component.html',
  styleUrls: ['./phases.component.scss']
})
export class PhasesComponent implements OnInit {
  @Input() data?: PhaseList[];

  constructor() {}

  ngOnInit(): void {}
  public isLoaded(): boolean {
    let isLoaded = false;
    if (this.data == null) {
      isLoaded = false;
    } else {
      isLoaded = true;
    }

    return isLoaded;
  }
}
