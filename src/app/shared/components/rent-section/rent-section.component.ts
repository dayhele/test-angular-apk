import { Component, Input } from '@angular/core';
import { Device } from 'src/app/helpers/device';
import { environment } from '../../../../environments/environment';
import { CardProperties } from '../../interfaces/card-default';
import { CardListData } from '../../interfaces/card-home';

@Component({
  selector: 'app-rent-section',
  templateUrl: './rent-section.component.html',
  styleUrls: ['./rent-section.component.scss']
})
export class RentSectionComponent {
  @Input() public sectionTitle?: string;
  @Input() public sectionButtonText?: string;
  @Input() public cardProperties?: CardProperties;
  @Input() public data?: CardListData[];
  @Input() public clickedRent: boolean = false;

  public environment: any;
  public isMobile: boolean = Device.isMobile();

  constructor() {
    this.sectionTitle = '';

    this.sectionButtonText = '';

    this.cardProperties = {};

    this.data = [];

    this.environment = environment;
  }
}
