import { Component, Input } from '@angular/core';
import { ComingSoon } from '../../interfaces/coming-soon';

@Component({
  selector: 'app-coming-soon-section',
  templateUrl: './coming-soon-section.component.html',
  styleUrls: ['./coming-soon-section.component.scss']
})
export class ComingSoonSectionComponent {
  @Input() public comingSoon: Array<ComingSoon>;

  constructor() {
    this.comingSoon = [];
  }
}
