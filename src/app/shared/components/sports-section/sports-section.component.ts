import { Device } from 'src/app/helpers/device';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CardProperties } from '../../interfaces/card-default';
import { CardListData } from '../../interfaces/card-home';
import { CheckDeviceService } from '../../services/check-device.service';

@Component({
  selector: 'app-sports-section',
  templateUrl: './sports-section.component.html',
  styleUrls: ['./sports-section.component.scss']
})
export class SportsSectionComponent {
  @Input() public sectionTitle?: string;
  @Input() public sectionIcon?: string;
  @Input() public sectionButtonText?: string;
  @Input() public cardProperties?: CardProperties;
  @Input() public data?: CardListData[];
  public isMobile: boolean = false;
  public checkMobile: boolean = false;

  constructor(private route: Router, private checkDevice: CheckDeviceService) {
    this.checkMobile = this.checkDevice.isMobile();
    this.isMobile = Device.isMobile();
    this.sectionIcon = '';

    this.sectionTitle = '';

    this.sectionButtonText = '';

    this.cardProperties = {};

    this.data = [];
  }

  public goToSports(): void {
    this.route.navigate([`../sports`]);
  }
}
