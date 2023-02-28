import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
  public isOpen: boolean;

  constructor(private el: ElementRef) {
    this.isOpen = false;
  }

  ngOnInit(): void {
    this.el.nativeElement.addEventListener('click', () => {
      this.toggleDropdown();
    });
  }


  public toggleDropdown(): void {
    this.isOpen = !this.isOpen;

    this.handleDropdown();
  }

  public handleDropdown(): void {
    if (
      this.el.nativeElement.children.item(0) &&
      this.el.nativeElement.children.item(1)
    ) {
      const p = this.el.nativeElement.children.item(0);
      const ul = this.el.nativeElement.children.item(1);
      if (this.isOpen) {
        this.el.nativeElement.classList.add('active');
        p.style.marginBottom = ul.clientHeight / 16 + 'rem';
        ul.style.top = 20 / 16 + 'rem';
      } else {
        this.el.nativeElement.classList.remove('active');
        p.style.marginBottom = 0;
        ul.style.top = '-100%';
      }
    }
  }


}
