import { Directive, ElementRef, OnInit } from '@angular/core';
import { Theme } from 'src/assets/theme/theme';

@Directive({
  selector: '[appMobileMenu]'
})
export class MobileMenuDirective implements OnInit {
  constructor(private el: ElementRef, public theme: Theme) {}
  ngOnInit(): void {
    this.initMenu();
  }

  public initMenu(): void {
    const menuButton = document.getElementById('iconMenu');
    const imgIcon = document.getElementById('imgIcon');

    if (menuButton) {
      menuButton.addEventListener('click', () => {
        if (this.el.nativeElement.classList.contains('active')) {
          this.el.nativeElement.classList.remove('active');
          imgIcon?.setAttribute('src', '/assets/icons/hamburguer.svg');
          document
            .getElementsByClassName('shadow-behind')
            .item(0)
            ?.classList.remove('visible');

          this.el.nativeElement.closest('body').classList.remove('no-scroll');
        } else {
          this.el.nativeElement.classList.add('active');
          imgIcon?.setAttribute('src', this.theme.closeMenu);
          document
            .getElementsByClassName('shadow-behind')
            .item(0)
            ?.classList.add('visible');

          this.el.nativeElement.closest('body').classList.add('no-scroll');
        }
      });

      document
        .getElementsByClassName('shadow-behind')
        .item(0)
        ?.addEventListener('click', () => {
          menuButton.click();
        });
    }
  }
}
