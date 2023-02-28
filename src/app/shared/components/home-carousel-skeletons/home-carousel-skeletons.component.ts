import {Component, Input, OnInit} from '@angular/core';
import {HomeControlType} from "../../enums/homeControlType";

@Component({
  selector: 'app-home-carousel-skeletons',
  templateUrl: './home-carousel-skeletons.component.html',
  styleUrls: ['./home-carousel-skeletons.component.scss']
})
export class HomeCarouselSkeletonsComponent implements OnInit {

  @Input() isLoggedOutHome?: boolean = false;
  @Input() type?: string = '';
  @Input() screenX: number = 0;

  public bigTypes: string[] = [
    HomeControlType.isKeepWatching,
    HomeControlType.isRented,
    HomeControlType.isNSportsMatches,
    HomeControlType.isMostWatchedChannels,
    HomeControlType.isToRent
  ];

  public wideTypes: string[] = [
    HomeControlType.Xpeed,
    HomeControlType.isNovelas
  ];

  public isLoggedOutHomeDontShowTypes: string[] = [
    HomeControlType.isMostWatchedChannels,
    HomeControlType.isKeepWatching,
    HomeControlType.isPreSaveTitles,
    HomeControlType.isConmebolLibertadores,
    HomeControlType.isRented,
    HomeControlType.isJump,
    HomeControlType.isNSportsMatches,
    HomeControlType.isLiveAndOnDemand
  ];

  constructor() { }

  ngOnInit(): void { }

  public getTheme(width: string, height: string, options: Object = {}) {
    return Object.assign({
      width,
      height,
      borderRadius: '8px',
      background: 'rgba(122,122,122,.2)',
    }, options);
  }

  public getSkeletonInfo(src: string = 'card', type: string = 'count') {
    let obj: any = {
      width: 0, height: 0,
      space: { left: 3.5 * 16, right: 3.5 * 16 },
      margin: { right: 0, left: 0 },
    }
    switch (src) {
      case 'card':
        obj.width = 196
        obj.height = 286
        obj.margin.right = 24
        if (this.screenX < 900) {
          obj.space.left = 1.5 * 16
          obj.space.right = 1.5 * 16
          obj.width = 100
          obj.height = 155.02
          obj.margin.right = 0.75 * 16
        }
        break;
      case 'big':
        obj.width = 414
        obj.height = 286
        obj.margin.right = 1.5 * 16
        if (this.screenX <= 900) {
          obj.width = 220
          obj.height = 154
          obj.margin.right = 0.75 * 16
        }
        break;
      case 'wide':
        obj.width = 55 // vw
        obj.height = 240
        if (this.screenX <= 900) {
          obj.width = 35 // vw
          obj.height = 70
        }
        break;
    }
    switch (type) {
      case 'width':
        return obj.width;
      case 'height':
        return obj.height;
      case 'marginRight':
        return obj.margin.right;
      case 'spaceLeft':
        return obj.space.left;
      case 'spaceRight':
        return obj.space.right;
    }
    let x = (this.screenX - (obj.space.left + obj.space.right)) / (obj.width + obj.margin.left + obj.margin.right);
    return Math.floor(x);
  }
}
