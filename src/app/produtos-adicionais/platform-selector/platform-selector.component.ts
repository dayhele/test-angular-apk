import { Router, ActivatedRoute } from '@angular/router';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-platform-selector',
  templateUrl: './platform-selector.component.html',
  styleUrls: ['./platform-selector.component.scss']
})
export class PlatformSelectorComponent {
  get selectorOption(): string {
    return this.parentRoute.split('/')[3]
  }

  @Input() parentRoute: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  navigate(route: string) {
    let _activeTutorial = this.parentRoute.split('/')[2];
    this.router.navigate(['produtos-adicionais', _activeTutorial, route]);
  }
}
