import { PlansService } from './../shared/services/plans.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { Device } from '../helpers/device';
import { ChannelModal } from '../shared/interfaces/channels-modal';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-directvgo',
  templateUrl: './directvgo.component.html',
  styleUrls: ['./directvgo.component.scss']
})
export class DirectvgoComponent {
  public environment: any;
  public deviceWidth: number;

  constructor() {
    this.environment = environment;
    this.deviceWidth = 0;
  }

  @HostListener('window: resize')
  public onResize() {
    this.deviceWidth = window.innerWidth;
  }

  @HostListener('window: load')
  public onLoad() {
    this.deviceWidth = window.innerWidth;
  }
}
