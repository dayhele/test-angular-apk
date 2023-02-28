import { Component, OnInit } from '@angular/core';
import { Theme } from 'src/assets/theme/theme';

@Component({
  selector: 'app-hbo-max-smart-tv',
  templateUrl: './hbo-max-smart-tv.component.html',
  styleUrls: ['./hbo-max-smart-tv.component.scss']
})
export class HboMaxSmartTvComponent {
  constructor(public theme: Theme) {}
}
