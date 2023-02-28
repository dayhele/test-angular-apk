import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { DetailedProgram } from '../../interfaces/program-details';
import { WatchService } from '../../../watch/shared/watch.service';


@Component({
  selector: 'app-now-card',
  templateUrl: './now-card.component.html',
  styleUrls: ['./now-card.component.scss']
})
export class NowCardComponent implements OnInit {
  @Input() public censorship: string;
  @Input() public program: DetailedProgram;

  public timeStart: string;
  public timeEnd: string;
  public duration: string;

  public screen_x: number;
  @HostListener('window: resize', ['$event'])
  public onResize() {
    this.screen_x = window.innerWidth;
  }

  @ViewChild('refImage') public image?: ElementRef<HTMLImageElement>;

  constructor(private watchService: WatchService) {
    this.censorship = '';
    this.program = {};
    this.screen_x = 0;
    this.timeStart = '';
    this.timeEnd = '';
    this.duration = '';
  }

  ngOnInit(): void {
    if (window) {
      this.screen_x = window.innerWidth;
    }

    this.initCard();
  }

  public initCard(): void {
    if (this.program.time && this.program.duration) {
      this.timeStart = this.program.time;
      this.duration = this.program.duration;
      this.timeEnd = this.getTimeEnd(this.timeStart, this.duration);
    }
  }

  public getTimeEnd(startH: string, duration: string) {
    let [startHours, startMinutes] = startH.split(':');

    let [durationHours, durationMinutes] = duration.split(':');

    let endHours = parseInt(startHours) + parseInt(durationHours);
    let endMinutes = parseInt(startMinutes) + parseInt(durationMinutes);

    if (endMinutes >= 60) {
      endMinutes -= 60;
      endHours++;
    }

    return `${endHours.toLocaleString('pt-BR', {
      minimumIntegerDigits: 2
    })}:${endMinutes.toLocaleString('pt-BR', { minimumIntegerDigits: 2 })}`;
  }

  public goWatch(): void {
    if (this.program && this.program.channelId)
      this.watchService.watch(this.program.channelId, 'filme', true);
  }
}
