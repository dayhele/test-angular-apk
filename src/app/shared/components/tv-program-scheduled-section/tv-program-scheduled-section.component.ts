import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Channel } from '../../interfaces/now-channel';
import { DetailedProgram } from '../../interfaces/program-details';
import { NowService } from '../../services/now.service';
import { WatchService } from '../../../watch/shared/watch.service';

@Component({
  selector: 'app-tv-program-scheduled-section',
  templateUrl: './tv-program-scheduled-section.component.html',
  styleUrls: ['./tv-program-scheduled-section.component.scss']
})
export class TvProgramScheduledSectionComponent implements OnInit {
  @Input() public channel?: Channel;
  @Input() public isNextDay?: boolean;
  @Input() public profileAgeBracket: string | number;
  @Output() public isLoaded = new EventEmitter<boolean>();
  @Output() public emitter = new EventEmitter<[DetailedProgram, string]>();

  public isLoading: boolean;
  public blocked: boolean;
  public programs?: DetailedProgram[];
  public nextDayPrograms?: DetailedProgram[];

  constructor(
    private nowService: NowService,
    private watchService: WatchService
  ) {
    this.isLoading = true;
    this.blocked = true;
    this.profileAgeBracket = 0;
  }

  ngOnInit(): void {
    this.checkIfIsLoaded();
    this.checkIfProgramsIsLoaded();
  }

  public goWatch(): void {
    if (this.channel?.id)
      this.watchService.watch(this.channel?.id, 'filme', true);
  }

  public checkIfIsLoaded(): void {
    let interval = setInterval(() => {
      if (this.channel && this.channel.dates && this.channel.dates.length > 0) {
        let currentDayProgramsId = '';
        let nextDayProgramsId = '';

        if (
          this.channel.dates[0]?.programs &&
          this.channel.dates[1]?.programs
        ) {
          for (
            let index = 0;
            index < this.channel.dates[0].programs.length;
            index++
          ) {
            currentDayProgramsId = `${currentDayProgramsId}, ${this.channel.dates[0].programs[index].id}`;
          }

          for (
            let index = 0;
            index < this.channel.dates[1].programs.length;
            index++
          ) {
            nextDayProgramsId = `${nextDayProgramsId}, ${this.channel.dates[1].programs[index].id}`;
          }
        }

        this.getCurrentDayPrograms(currentDayProgramsId);
        this.getNextDayPrograms(nextDayProgramsId);
        clearInterval(interval);
      }
    });
  }

  public checkIfProgramsIsLoaded() {
    let interval = setInterval(() => {
      if (this.programs && this.nextDayPrograms) {
        this.isLoading = false;
        this.isLoaded.emit(true);
        clearInterval(interval);
      }
    });
  }

  public getCurrentDayPrograms(currentDayProgramsId: string): void {
    this.nowService.getProgram(currentDayProgramsId).subscribe((programs) => {
      this.programs = programs.program;
    });
  }

  public getNextDayPrograms(nextDayProgramsId: string) {
    this.nowService.getProgram(nextDayProgramsId).subscribe((programs) => {
      this.nextDayPrograms = programs.program;
    });
  }

  public emit(program: [DetailedProgram, string]) {
    this.emitter.emit(program);
  }

  public setBlockedChannel(event: boolean) {
    this.blocked = event;
  }
}
