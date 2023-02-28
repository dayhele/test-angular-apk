import { Component, Input, OnInit } from '@angular/core';
import { WatchComponent } from 'src/app/watch/watch.component';
import { environment } from '../../../../environments/environment';
import { Languages } from '../../interfaces/languages';

@Component({
  selector: 'app-audio-options',
  templateUrl: './audio-options.component.html',
  styleUrls: ['./audio-options.component.scss']
})
export class AudioOptionsComponent {
  public environment: any;
  public isActive: boolean;
  public selectedSubtitleLanguageIndex: number;
  public selectedAudioLanguageIndex: number;

  @Input() public subtitlesLanguages: Languages[];
  @Input() public audioLanguages: Languages[];

  constructor(private watchComponent: WatchComponent) {
    this.isActive = false;

    this.subtitlesLanguages = [];
    this.audioLanguages = [];

    this.selectedSubtitleLanguageIndex = 0;
    this.selectedAudioLanguageIndex = 0;
    this.environment = environment;
  }

  public close(): void {
    this.isActive = false;
  }

  public toggleMenu(value?: boolean): void {
    if (value) this.isActive = value;
    else this.isActive = !this.isActive;
  }

  public changeSubtitleLanguage(index: number): void {
    this.selectedSubtitleLanguageIndex = index;
    this.watchComponent.toggleSubtitles(
      this.subtitlesLanguages[index].languageCode!
    );
  }

  public changeAudioLanguage(index: number): void {
    this.selectedAudioLanguageIndex = index;
    this.watchComponent.toggleAudioLanguage(
      this.audioLanguages[index].languageCode!
    );
  }
}
