import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { CardProperties } from '../../interfaces/card-default';
import { CardListData } from '../../interfaces/card-home';
import { CheckDeviceService } from '../../services/check-device.service';

@Component({
  selector: 'app-rent-card',
  templateUrl: './rent-card.component.html',
  styleUrls: ['./rent-card.component.scss']
})
export class RentCardComponent implements OnInit {
  @Input() public cardProperties?: CardProperties;
  @Input() public cardImage?: string;
  @Input() public data?: CardListData;
  @Input() public itemId?: number;
  @Input() public itemType?: string;
  public screen_x: number;
  public environment: any;
  public isMobile: boolean;
  public checkMobile: boolean = false;
  @HostListener('window: resize', ['$event'])
  public onResize() {
    this.screen_x = window.innerWidth;
  }

  constructor(private router: Router, private checkDevice: CheckDeviceService) {
    this.checkMobile = this.checkDevice.isMobile();
    this.cardProperties = {};
    this.cardImage = '';
    this.data = {};
    this.itemId = 0;
    this.itemType = '';
    this.screen_x = 0;
    this.environment = environment;
    this.isMobile = false;
  }
  ngOnInit(): void {
    if (window) {
      this.screen_x = window.innerWidth;
      if (this.screen_x < 768) this.isMobile = true;
    }
  }

  public goTo(): void {
    if (!this.isMobile)
      this.router.navigateByUrl(`/details/${this.itemId}/${this.itemType}`);
  }
}
