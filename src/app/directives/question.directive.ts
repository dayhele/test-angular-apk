import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appQuestion]'
})
export class QuestionDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.el.nativeElement.children[0].addEventListener(
      'click',
      this.openAnswer.bind(this)
    );

    this.setAnswerHeight();
  }

  public openAnswer(event: Event): void {
    const target = event.target as HTMLElement;

    if (target.localName == 'p') {
      const header = target.parentElement as HTMLElement;
      const body = header.nextElementSibling as HTMLElement;
      body.classList.toggle('collapsed');
      this.setAnswerHeight();
    } else {
      const body = target.nextElementSibling as HTMLElement;
      body.classList.toggle('collapsed');
      this.setAnswerHeight();
    }
  }

  public setAnswerHeight(): void {
    const body = this.el.nativeElement.children[1] as HTMLElement;
    if (body.classList.contains('collapsed')) {
      body.style.height = '0';
    } else {
      body.style.height = body.children[0].clientHeight + 'px';
    }
  }
}
