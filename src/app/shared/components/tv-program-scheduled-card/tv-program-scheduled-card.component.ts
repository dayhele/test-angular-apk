import { ProfileService } from 'src/app/shared/services/profile.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Units } from 'src/app/helpers/units';
import { DetailedProgram } from '../../interfaces/program-details';
import { TimerService } from '../../services/timer.service';
import { WatchService } from '../../../watch/shared/watch.service';

@Component({
  selector: 'app-tv-program-scheduled-card',
  templateUrl: './tv-program-scheduled-card.component.html',
  styleUrls: ['./tv-program-scheduled-card.component.scss']
})
export class TvProgramScheduledCardComponent implements OnInit {
  @Input() public censorship?: string;
  @Input() public channelBrand?: string;
  @Input() public channelId?: number;
  @Input() public profileAgeBracket?: string | number;
  @Input() public programs?: DetailedProgram[];
  @Input() public programId?: number;
  @Input() public isNextDay?: boolean;

  @Output() public blockedChannelEmitter = new EventEmitter<boolean>();
  @Output() public emitter = new EventEmitter<[DetailedProgram, string]>();

  public alreadyEmitted: boolean;
  public alreadyRemoved: boolean;
  public duration: string;
  public program?: DetailedProgram;
  public live?: boolean;
  public isLoading: boolean;
  public timer: Date;
  public timeEnd: string;
  public timeStart: string;
  public timeWidth: string;
  public timeWidthBlockedCard: string;

  constructor(
    private timerService: TimerService,
    private watchService: WatchService
  ) {
    this.alreadyEmitted = false;
    this.alreadyRemoved = false;
    this.censorship = '';
    this.duration = '';
    this.isLoading = true;
    this.timer = new Date();
    this.timeWidth = '';
    this.timeWidthBlockedCard = '';
    this.timeStart = '';
    this.timeEnd = '';
  }

  ngOnInit(): void {
    this.isLive(this.timeStart, this.timeEnd);
    this.startTimer();
    this.initCard();
  }

  public startTimer(): void {
    this.timerService.handleTimer().subscribe((timer) => {
      this.timer = timer;
    });
  }

  public initCard(): void {
    let interval = setInterval(() => {
      if (this.programs && this.programId) {
        for (let index = 0; index < this.programs.length; index++) {
          if (this.programs[index].id === this.programId) {
            this.program = this.programs[index];
            this.timeStart = this.programs[index].time!;
            this.duration = this.programs[index].duration!;

            this.timeEnd = this.getTimeEnd(this.timeStart, this.duration);
            this.timeWidth = this.timeDiff(this.duration, false);
            this.timeWidthBlockedCard = this.timeDiff(this.duration, true);

            if (!this.isNextDay) {
              this.isLive(this.timeStart, this.duration);
            }
            this.isLoading = false;

            clearInterval(interval);
            break;
          }
        }
      }
    }, 10);
  }

  public getTimeEnd(startH: string, duration: string): string {
    let [startHours, startMinutes] = startH.split(':');

    let [durationHours, durationMinutes] = duration.split(':');

    let endHours = parseInt(startHours) + parseInt(durationHours);
    let endMinutes = parseInt(startMinutes) + parseInt(durationMinutes);

    if (endMinutes >= 60) {
      endMinutes -= 60;
      endHours++;
    }

    if (endHours >= 24) {
      let dif = endHours - 24;
      endHours = 0 + dif;
    }

    return `${endHours.toLocaleString('pt-BR', {
      minimumIntegerDigits: 2
    })}:${endMinutes.toLocaleString('pt-BR', { minimumIntegerDigits: 2 })}`;
  }

  public isLive(start: string, duration: string): void {
    this.timerService.handleTimer().subscribe((timer) => {
      const startH = parseInt(start.substring(0, 2));
      const startM = parseInt(start.substring(3));

      const durationH = parseInt(duration.substring(0, 2));
      const durationM = parseInt(duration.substring(3));

      const startInMinutes = startH * 60 + startM;
      const durationInMinutes = durationH * 60 + durationM;

      const currentTimeInMinutes = timer.getHours() * 60 + timer.getMinutes();

      if (
        this.inRange(
          startInMinutes,
          startInMinutes + durationInMinutes,
          currentTimeInMinutes
        ) &&
        this.alreadyEmitted === false
      ) {
        this.live = true;
        this.emitProgram();
        this.emittingChannelBlocked();
      } else if (
        this.outOfRange(
          startInMinutes + durationInMinutes,
          currentTimeInMinutes
        ) &&
        this.alreadyRemoved === false
      ) {
        this.live = false;
        this.removeProgram();
      }
    });
  }

  public outOfRange(max: number, current: number) {
    if (current - max == 0) {
      return true;
    }
    return false;
  }

  public emitProgram(): void {
    if (this.program) {
      this.program!.censorship = this.censorship;
      this.program!.channelBrand = this.channelBrand;
      this.program!.channelId = this.channelId;
      this.emitter.emit([this.program, 'add']);
      this.alreadyEmitted = true;
    }
  }

  public emittingChannelBlocked(): void {
    if (this.setBlocked()) {
      this.blockedChannelEmitter.emit(true);
      return;
    }
    this.blockedChannelEmitter.emit(false);
  }

  public setBlocked(): boolean {
    if (
      this.censorship === 'L' ||
      this.censorship === null ||
      this.censorship === undefined ||
      parseInt(this.censorship) <= this.profileAgeBracket!
    )
      return false;

    return true;
  }

  public removeProgram(): void {
    if (this.program) {
      this.emitter.emit([this.program, 'remove']);
      this.alreadyRemoved = true;
    }
  }

  public inRange(min: number, max: number, current: number): boolean {
    if (current >= min && current < max) {
      return true;
    }
    return false;
  }

  public timeDiff(duration: string, blockedCard: boolean): string {
    const durationHours = parseInt(duration.substring(0, 2));
    const durationMinutes = parseInt(duration.substring(3));
    const totalDurationInMinutes = durationHours * 60 + durationMinutes;
    if (blockedCard)
      return Units.convertMinuteToPixel(totalDurationInMinutes) - 4 + 'px';
    return Units.convertMinuteToPixel(totalDurationInMinutes) + 'px';
  }

  public goWatch(): void {
    if (!this.setBlocked() && this.live) {
      this.watchService.watch(this.channelId!, 'filme', true);
    }
  }
}
