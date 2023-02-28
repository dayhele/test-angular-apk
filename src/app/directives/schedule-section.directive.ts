import { Directive, ElementRef, OnInit } from '@angular/core';

import { NowComponent } from '../now/now.component';
import { Units } from './../helpers/units';
import { TimerService } from './../shared/services/timer.service';

@Directive({
  selector: '[appScheduleSection]'
})
export class ScheduleSectionDirective implements OnInit {
  private posX1 = 0;
  private posX2 = 0;
  private posInitial = 0;

  constructor(
    private el: ElementRef,
    private timerService: TimerService,
    private nowComponent: NowComponent
  ) {}

  ngOnInit(): void {
    this.rePosition();
    this.slide();
  }

  private slide(): void {
    this.el.nativeElement = this.el.nativeElement;

    this.el.nativeElement.addEventListener('mousedown', (e: MouseEvent) => {
      this.dragStart(e);
    });

    this.el.nativeElement.addEventListener('touchstart', (e: TouchEvent) => {
      this.dragStart(e);
    });

    this.el.nativeElement.addEventListener('touchmove', (e: TouchEvent) => {
      this.dragAction(e);
    });

    this.el.nativeElement.addEventListener('touchend', (e: TouchEvent) => {
      this.dragEnd(e);
    });
  }

  private dragStart(e: Event): void {
    e = e || window.event;
    this.posInitial = Number.parseInt(
      this.el.nativeElement.style.transform
        .replace('translate3d(', '')
        .replace('px, 0px, 0px)', '')
    );

    if (window.TouchEvent && e instanceof TouchEvent) {
      this.posX1 = e.touches[0].clientX;
    } else if (e instanceof MouseEvent) {
      this.posX1 = e.clientX;
      document.onmousemove = (event: Event) => {
        this.dragAction(event);
      };

      document.onmouseup = (event: Event) => {
        this.dragEnd(event);
      };
    }
  }

  private dragAction(e: Event): void {
    e = e || window.event;

    if (window.TouchEvent && e instanceof TouchEvent) {
      this.posX2 = this.posX1 - e.touches[0].clientX;
      this.posX1 = e.touches[0].clientX;
    } else if (e instanceof MouseEvent) {
      this.posX2 = this.posX1 - e.clientX;
      this.posX1 = e.clientX;
    }

    this.posInitial = Number.parseInt(
      this.el.nativeElement.style.transform
        .replace('translate3d(', '')
        .replace('px, 0px, 0px)', '')
    );

    this.nowComponent.moveAll(this.posInitial - this.posX2);
  }

  private dragEnd(e: Event): void {
    document.onmouseup = null;
    document.onmousemove = null;
  }

  private rePosition() {
    this.timerService.handleTimer().subscribe(() => {
      if (
        this.el.nativeElement.children &&
        this.el.nativeElement.children[0] &&
        this.el.nativeElement.children[0].children[0]
      ) {
        let left =
          this.el.nativeElement.children[0].children[0].getAttribute(
            'aria-value-text'
          );

        if (left) {
          const startH = parseInt(left.substring(0, 2));
          const startM = parseInt(left.substring(3));

          const startTimeInMinutes = startH * 60 + startM;

          const startTimeInPixels =
            Units.convertMinuteToPixel(startTimeInMinutes);

          this.el.nativeElement.style.left = startTimeInPixels + 20 + 'px';
        }
      }
    });
  }
}
