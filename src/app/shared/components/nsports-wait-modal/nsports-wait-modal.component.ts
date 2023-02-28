import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { Theme } from 'src/assets/theme/theme';
import { Movie } from '../../interfaces/movie';

@Component({
  selector: 'app-nsports-wait-modal',
  templateUrl: './nsports-wait-modal.component.html',
  styleUrls: ['./nsports-wait-modal.component.scss']
})
export class NsportsWaitModalComponent implements OnInit, DoCheck {
  public modal: boolean = false;
  @Input() public match: Movie;

  constructor(public theme: Theme) {
    this.match = {};
  }

  ngOnInit(): void {
    localStorage.removeItem('nsports-wait-modal');
  }

  ngDoCheck(): void {
    this.modal = !!localStorage.getItem('nsports-wait-modal');
  }

  public closeModal() {
    if (this.modal) {
      document.body.style.overflowY = "auto";
      localStorage.removeItem('nsports-wait-modal');
    }
  }

  public formatDate(synopsis: string): string {
    if (synopsis) {
      const separator = synopsis.split(',');

      if (separator.length > 2) {
        const date = separator[0];
        const hour = separator[1];

        return `${date} - ${hour}`;
      }

      return '';
    }

    return '';
  }
}
