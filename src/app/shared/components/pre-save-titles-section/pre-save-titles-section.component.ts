import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Theme } from 'src/assets/theme/theme';
import { environment } from 'src/environments/environment';
import { CardData } from '../../interfaces/card';
import { CardProperties } from '../../interfaces/card-default';
import { CheckDeviceService } from 'src/app/shared/services/check-device.service';

@Component({
  selector: 'app-pre-save-titles-section',
  templateUrl: './pre-save-titles-section.component.html',
  styleUrls: ['./pre-save-titles-section.component.scss']
})
export class PreSaveTitlesSectionComponent {
  @Input() public hasExploreButton: boolean = true;
  @Input() public hasNavigation: boolean = true;
  @Input() public allowTouchMove: boolean = true;
  @Input() public text: string = '';
  @Input() public preSaves: CardData[];
  @Input() public id: number;

  public readonly iconPath: string = 'https://watchbr-resources.s3.amazonaws.com/pre_saves_icons/icon-pre-save.svg';
  public cardProperties: CardProperties = { orientation: 'vertical' };
  public checkMobile: boolean = false;
  public environment: any;

  constructor(public theme: Theme, private router: Router, private checkDevice: CheckDeviceService) {
    this.checkMobile = this.checkDevice.isMobile();
    this.environment = environment;
    this.preSaves = [];
    this.id = 0;
  }

  public goTo(path: string) {
    this.router.navigateByUrl(path);
  }
}
