import { Component, OnInit } from '@angular/core';
import { Theme } from 'src/assets/theme/theme';

@Component({
  selector: 'app-hbo-max-web',
  templateUrl: './hbo-max-web.component.html',
  styleUrls: ['./hbo-max-web.component.scss']
})
export class HboMaxWebComponent {
  constructor(public theme: Theme) {}
}
