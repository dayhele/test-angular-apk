import { Component, HostListener, Input, OnInit } from '@angular/core';
import { WatchService } from '../../../watch/shared/watch.service';

@Component({
  selector: 'app-card-rounded',
  templateUrl: './card-rounded.component.html',
  styleUrls: ['./card-rounded.component.scss']
})
export class CardRoundedComponent implements OnInit {
  private pathChannelIcons: string;

  @Input() public channel: any;
  @Input() public profileAgeBracket: number;
  @Input() public disableClick: boolean = false;

  public censorchip: number;
  public lockImgSrc: string;

  constructor(private watchService: WatchService) {
    this.pathChannelIcons =
      'https://watchbr-resources.s3.amazonaws.com/channels/';
    this.censorchip = 0;
    this.profileAgeBracket = 0;
    this.lockImgSrc = '';
    this.channel = {};
  }

  ngOnInit(): void {
    this.channel.channelBrand = this.channel.white;
    this.setCensorchip();
  }

  @HostListener('mouseover') onMouseover() {
    this.lockImgSrc = 'assets/icons/lock.svg';
  }

  @HostListener('mouseout') onMouseout() {
    this.lockImgSrc = '';
  }

  public watch(): void {
    if (this.disableClick) return;
    if (this.censorchip <= this.profileAgeBracket) {
      this.watchService.watch(this.channel.id!, 'filme', true);
    }
  }

  public setCensorchip() {
    if (!this.channel.dates) return;

    if (
      !this.channel.dates[0].programs[0].tvRating ||
      this.channel.dates[0].programs[0].tvRating === 'L'
    ) {
      this.censorchip = 0;
      return;
    }
    this.censorchip = this.channel.dates[0].programs[0].tvRating;
  }
}
