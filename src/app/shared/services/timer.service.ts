import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CurrentDay } from '../interfaces/current-day';

@Injectable({
  providedIn: 'root'
})
export class TimerService implements OnDestroy {
  private time: Date;
  private currentDay: CurrentDay = {};
  private nextDay: CurrentDay = {};
  private timer: Subject<Date>;
  private daytimes: Subject<CurrentDay>;
  private nextDaytimes: Subject<CurrentDay>;
  private repeater: any;

  constructor() {
    this.time = new Date();
    this.currentDay = {};
    this.nextDay = {};
    this.timer = new Subject<Date>();
    this.daytimes = new Subject<CurrentDay>();
    this.nextDaytimes = new Subject<CurrentDay>();
    this.repeater = setInterval(() => {});

    this.onInit();
  }

  public onInit(): void {
    this.repeater = setInterval(() => {
      this.time = new Date();
      this.timer.next(this.time);

      if (!this.currentDay.schedules) {
        this.updateCurrentDay(this.currentDay);
        this.updateCurrentDay(this.nextDay, true);
        this.daytimes.next(this.currentDay);
        this.nextDaytimes.next(this.nextDay);
      } else {
        if (this.currentDay.currentScheduleIndex) {
          if (
            this.currentDay.schedules[
              this.currentDay.currentScheduleIndex
            ].getDate() !== this.time.getDate()
          ) {
            this.updateCurrentDay(this.currentDay);
            this.updateCurrentDay(this.nextDay, true);
            this.daytimes.next(this.currentDay);
            this.nextDaytimes.next(this.nextDay);
          }
        }
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.repeater);
  }

  public handleTimer(): Observable<Date> {
    return this.timer.asObservable();
  }

  public handleDaytimes(): Observable<CurrentDay> {
    return this.daytimes.asObservable();
  }

  public handleNextDay(): Observable<CurrentDay> {
    return this.nextDaytimes.asObservable();
  }

  private updateCurrentDay(_day: CurrentDay, isNextDay?: boolean): void {
    _day.schedules = this.getDaytimes(isNextDay);
    if (!isNextDay) {
      _day.schedules!.map((schedule, index) => {
        if (
          schedule.getHours() == this.time.getHours() &&
          schedule.getMinutes() <= this.time.getMinutes()
        ) {
          const year = new Intl.DateTimeFormat('pt-BR', {
            year: 'numeric'
          }).format(this.time);

          const month = new Intl.DateTimeFormat('pt-BR', {
            month: '2-digit'
          }).format(this.time);

          const day = new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit'
          }).format(this.time);

          _day.year = year;
          _day.month = month;
          _day.day = day;
          _day.date = `${year}-${month}-${day}`;

          _day.currentScheduleIndex = index;
        }
      });
    } else {
      const year = new Intl.DateTimeFormat('pt-BR', {
        year: 'numeric'
      }).format(_day.schedules[0]);

      const month = new Intl.DateTimeFormat('pt-BR', {
        month: '2-digit'
      }).format(_day.schedules[0]);

      const day = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit'
      }).format(_day.schedules[0]);

      _day.year = year;
      _day.month = month;
      _day.day = day;
      _day.date = `${year}-${month}-${day}`;

      _day.currentScheduleIndex = 0;
    }
  }

  private generateDaytimes(
    intervalInMinutes: number,
    isNextDay?: boolean
  ): Date[] {
    let lastHours = 0;
    let lastMinutes = 0;
    let daytimes = new Array<Date>();

    for (let i = 0; i < 1440 / intervalInMinutes; i++) {
      if (lastMinutes == 60) {
        lastHours++;
        lastMinutes = 0;
      } else if (lastMinutes > 60) {
        lastHours++;
        lastMinutes -= intervalInMinutes;
      }

      if (isNextDay) {
        const date = new Date();
        date.setHours(lastHours);
        date.setMinutes(lastMinutes);
        date.setSeconds(0);
        date.setDate(date.getDate() + 1);
        daytimes.push(date);
      } else {
        const date = new Date();
        date.setHours(lastHours);
        date.setMinutes(lastMinutes);
        date.setSeconds(0);
        daytimes.push(date);
      }
      lastMinutes += intervalInMinutes;
    }

    return daytimes;
  }

  private getDaytimes(isNextDay?: boolean): Date[] {
    const daytimes = this.generateDaytimes(30, isNextDay);
    return daytimes;
  }
}
