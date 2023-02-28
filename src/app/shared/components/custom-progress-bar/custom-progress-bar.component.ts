import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { WatchComponent } from 'src/app/watch/watch.component';

@Component({
  selector: 'app-custom-progress-bar',
  templateUrl: './custom-progress-bar.component.html',
  styleUrls: ['./custom-progress-bar.component.scss']
})
export class CustomProgressBarComponent {
  @Input() position: number = 0;
  @Input() duration: number = 0;
  @Input() min: number = 0;


  @Output() updateCurrentTime = new EventEmitter();

  constructor(private watchComponent: WatchComponent) {
  }

  

  public changePosition(event: MatSliderChange): void {
    this.updateCurrentTime.emit(event.value!);
  }
}
