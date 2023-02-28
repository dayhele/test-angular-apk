import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Theme } from 'src/assets/theme/theme';

@Component({
  selector: 'app-institucional',
  templateUrl: './institucional.component.html',
  styleUrls: ['./institucional.component.scss']
})
export class InstitucionalComponent implements OnInit {
  constructor(public theme: Theme, private router: Router) {}

  ngOnInit(): void {
    if (this.theme.client !== 'multilaser') {
      this.router.navigateByUrl('/login');
    }

    this.router.events.subscribe((route) => {
      if (route instanceof NavigationEnd) {
        if (this.getCurrentPage().includes('/institucional/plans')) {
          this.scrollToElement('section5');
        }
      }
    });

    setTimeout(() => {
      if (this.getCurrentPage().includes('/institucional/plans')) {
        this.scrollToElement('section5');
      }
    }, 1000);
  }

  public getCurrentPage(): string {
    return this.router.url;
  }

  public scrollToElement(element: string): void {
    document.getElementById(element)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  }
}
