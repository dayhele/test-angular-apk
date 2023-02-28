import { Component, Input, OnInit } from '@angular/core';
import { CardProperties } from '../../shared/interfaces/card-default';
import { EpisodeData } from '../../shared/interfaces/movie';
import { NextEpisodeService } from '../shared/next-episode.service';

@Component({
  selector: 'app-next-episode',
  templateUrl: './next-episode.component.html',
  styleUrls: ['./next-episode.component.scss']
})
export class NextEpisodeComponent {
  public cardProperties: CardProperties;

  @Input() public episode: EpisodeData;
  public nextEpisodeLabel: string = '';

  constructor(private nextEpisodeService: NextEpisodeService) {
    this.cardProperties = {
      orientation: 'vertical',
      movieLogo: true
    };

    this.episode = {};
    this.nextEpisodeLabel =
      'T' +
      (this.nextEpisodeService.nextSeasonOrder ) +
      ':E' +
      (this.nextEpisodeService.nextEpisodeIndex + 1);
  }
}
