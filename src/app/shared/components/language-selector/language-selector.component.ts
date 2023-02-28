import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges
} from '@angular/core';
import { environment } from 'src/environments/environment';
import { Language } from '../../interfaces/language';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent {
  @Input() audioPack: Language[];
  @Input() subtitlePack: Language[];
  @Output() languageChange: EventEmitter<Language> = new EventEmitter();
  public environment = environment;
  public isActive: boolean = false;

  constructor() {
    this.audioPack = [];
    this.subtitlePack = [];
  }

  public close(): void {
    this.isActive = false;
  }

  public toggleMenu(): void {
    this.isActive = !this.isActive;
  }

  public selectSubtitle(track: any): void {
    this.subtitlePack.forEach((track) => {
      track.isSelected = false;
    });
    track.isSelected = true;

    this.languageChange.emit(track);
  }
  public selectTrack(track: any): void {
    this.audioPack.forEach((_track) => {
      _track.isSelected = false;
    });
    track.isSelected = true;
    this.languageChange.emit(track);
  }
}
