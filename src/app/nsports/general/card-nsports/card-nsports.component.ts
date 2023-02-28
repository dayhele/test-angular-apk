import { Component, HostListener, Input, OnInit } from '@angular/core';
import { CardProperties } from 'src/app/shared/interfaces/card-default';

@Component({
  selector: 'app-card-nsports',
  templateUrl: './card-nsports.component.html',
  styleUrls: ['./card-nsports.component.scss']
})
export class CardNsportsComponent implements OnInit {

  public screen_x: number;

  @Input() public carouselIsLoaded: boolean;
  @Input() public isSubscriber: boolean;
  @Input() public sectionCards: any;
  @Input() public title: string;
  @Input() public properties: CardProperties;

  constructor() {
    this.carouselIsLoaded = false;
    this.isSubscriber = false;
    this.sectionCards = [];
    this.title = '';
    this.properties = {};

    this.screen_x = 0;
  }

  ngOnInit(): void {
    if (window) this.screen_x = window.innerWidth;
  }

  @HostListener('window: resize', ['$event'])

  public onResize() {
    this.screen_x = window.innerWidth;
  }

}
