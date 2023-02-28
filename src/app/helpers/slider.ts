import { ElementRef } from '@angular/core';

export class Slider {
  public static slideTo(el: any, slideX: number) {
    if (el instanceof ElementRef) {
      el.nativeElement.style.transform = Slider.translate3D(slideX);
    } else {
      el.style.transform = Slider.translate3D(slideX);
    }
  }

  static translate3D(posX: number) {
    return `translate3D(${posX}px, 0, 0)`;
  }
}
