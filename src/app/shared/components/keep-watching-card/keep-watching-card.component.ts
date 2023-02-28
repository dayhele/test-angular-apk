import { Component, HostListener, Input, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CardProperties } from '../../interfaces/card-default';
import { CardListData } from '../../interfaces/card-home';
import { EpisodeData } from '../../interfaces/movie';
import { WatchService } from '../../../watch/shared/watch.service';

@Component({
  selector: 'app-keep-watching-card',
  templateUrl: './keep-watching-card.component.html',
  styleUrls: ['./keep-watching-card.component.scss']
})
export class KeepWatchingCardComponent implements OnInit {
  @Input() public isToPlay?: boolean;
  @Input() public serieId?: number;
  @Input() public type?: string;
  @Input() public episode?: EpisodeData;
  @Input() public cardProperties?: CardProperties;
  @Input() public cardImage?: string;
  @Input() public data?: CardListData;
  @Input() public censorship?: string;
  @Input() public progress?: number;
  @Input() public duration?: number;
  public environment: any;
  public screen_x: number;

  @HostListener('window: resize', ['$event'])
  public onResize() {
    this.screen_x = window.innerWidth;
  }
  constructor(private watchService: WatchService) {
    this.serieId = 0;
    this.episode = {};
    this.cardProperties = {};
    this.cardImage = '';
    this.data = {};
    this.screen_x = 0;
    this.environment = environment;

    this.progress = 0;
    this.duration = 0;
  }
  ngOnInit(): void {
    if (window) {
      this.screen_x = window.innerWidth;
    }

    if (this.data?.position && this.data?.duration) {
      this.data.progress = this.formatProgressBar(
        this.data.position,
        this.data.duration
      );
    }
  }

  public formatProgressBar(position: number, duration: number) {
    return (position / duration) * 100;
  }
  public play(): void {
    if (this.isToPlay) {
      this.watchService.watch(
        this.serieId!,
        this.type!,
        false,
        this.data!.id,
        false
      );
    }
  }
}
