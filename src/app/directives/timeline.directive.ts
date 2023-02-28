import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit
} from '@angular/core';
import { Units } from '../helpers/units';
import { TimerService } from '../shared/services/timer.service';

@Directive({
  selector: '[appTimeline]'
})
export class TimelineDirective implements OnInit, OnChanges {
  marginLeft = 56;
  screenWidth = 0;
  minX = 50;
  timer = new Date();
  scroll = 0;
  screenSize = 0;

  @Input() appTimeline = 0;

  constructor(private el: ElementRef, private timerService: TimerService) {}

  @HostListener('window: scroll', ['$event'])
  public onScroll(): void {
    this.scroll = window.scrollY;
  }

  @HostListener('window: resize', ['$event'])
  public onResize(): void {
    this.reUpdateMinX();
    this.screenWidth = this.el.nativeElement.closest('body').clientWidth;
  }

  ngOnInit(): void {
    this.screenWidth = this.el.nativeElement.closest('body').clientWidth;
    this.rePosition();
    this.startTimer();
  }

  ngOnChanges(): void {
    this.rePosition();
  }

  private startTimer() {
    this.timerService.handleTimer().subscribe((timer) => {
      this.screenWidth = this.el.nativeElement.closest('body').clientWidth;
      this.timer = timer;
      this.rePosition();
      this.reUpdateMinX();
    });
  }

  private reUpdateMinX(): void {
    if (this.screenWidth <= 768) {
      this.minX = 18;
    } else {
      this.minX = 50;
    }
  }

  private rePosition(): void {
    const cap = this.timer.getHours();

    const currentMinutesInPixels = Units.convertMinuteToPixel(
      this.timer.getMinutes()
    );

    const translate = cap * 600 + currentMinutesInPixels + 56 - 30 + 20;

    if (translate + this.appTimeline > this.screenWidth - 80) {
      this.el.nativeElement.style.transform = this.translate(
        this.screenWidth - this.el.nativeElement.clientWidth
      );
      this.el.nativeElement.classList.remove('active');

      this.el.nativeElement.children[0].children[0].textContent = 'Agora';
    } else if (translate + this.appTimeline >= this.minX) {
      this.el.nativeElement.style.transform = this.translate(
        translate + this.appTimeline
      );
      this.el.nativeElement.classList.add('active');

      this.el.nativeElement.children[0].children[0].textContent = `${this.timer
        .getHours()
        .toLocaleString('pt-BR', { minimumIntegerDigits: 2 })}:${this.timer
        .getMinutes()
        .toLocaleString('pt-BR', { minimumIntegerDigits: 2 })}`;
    } else if (translate + this.appTimeline < this.minX) {
      this.el.nativeElement.style.transform = this.translate(
        translate + this.appTimeline
      );
      this.el.nativeElement.classList.remove('active');
      this.el.nativeElement.children[0].children[0].textContent = 'Agora';

      if (translate + this.appTimeline <= 0) {
        this.el.nativeElement.style.transform = this.translate(0);
      }
    }
  }

  private translate(xAxis: number) {
    if (this.screenWidth <= 768) {
      return `translate3D(${xAxis > 55 ? xAxis : 55}px, 0, 0)`;
    } else {
      return `translate3D(${xAxis > 165 ? xAxis : 165}px, 0, 0)`;
    }
  }
}
