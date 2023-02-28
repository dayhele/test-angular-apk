import { Component, HostListener, Input, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CardProperties } from '../../interfaces/card-default';
import { CardListData } from '../../interfaces/card-home';

@Component({
  selector: 'app-sports-card',
  templateUrl: './sports-card.component.html',
  styleUrls: ['./sports-card.component.scss']
})
export class SportsCardComponent implements OnInit {
  @Input() public cardProperties?: CardProperties;
  @Input() public cardImage?: string;
  @Input() public data?: CardListData;

  public environment: any;

  public screen_x: number;
  @HostListener('window: resize', ['$event'])
  public onResize() {
    this.screen_x = window.innerWidth;
  }
  constructor() {
    this.cardProperties = {};
    this.cardImage = '';
    this.data = {};
    this.screen_x = 0;
    this.environment = environment;
  }
  ngOnInit(): void {
    if (window) {
      this.screen_x = window.innerWidth;
    }
  }
}
