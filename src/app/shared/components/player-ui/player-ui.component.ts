import { Component, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-player-ui',
  templateUrl: './player-ui.component.html',
  styleUrls: ['./player-ui.component.scss']
})
export class PlayerUIComponent {
  @Input() actualTime: number;
  @Input() fullTime: number;

  public isPlaying: boolean;
  public environment: any;

  constructor() {
    this.actualTime = 0;
    this.fullTime = 0;
    this.isPlaying = true;
    this.environment = environment;
  }

  public togglePlay(): void {
    this.isPlaying = !this.isPlaying;
  }
}
