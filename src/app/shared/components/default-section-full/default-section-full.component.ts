import { Router } from '@angular/router';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-default-section-full',
  templateUrl: './default-section-full.component.html',
  styleUrls: ['./default-section-full.component.scss']
})
export class DefaultSectionFullComponent {
  @Input() public sectionTitle?: string;
  @Input() public sectionDescription?: string;
  @Input() public sectionButtonText?: string;
  @Output() public highlightRedirect = new EventEmitter();

  constructor() {
    this.sectionTitle = '';

    this.sectionDescription = '';

    this.sectionButtonText = '';
  }
}
