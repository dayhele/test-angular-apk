import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Theme } from 'src/assets/theme/theme';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-section1',
  templateUrl: './section1.component.html',
  styleUrls: ['./section1.component.scss']
})
export class Section1Component {
  @Output() public scrollEventEmitter: EventEmitter<any> = new EventEmitter();
  public environment: any;

  constructor(public theme: Theme, private router: Router) {
    this.environment = environment;
  }

  public goTo(): void {
    if (this.theme.client === 'watch') this.router.navigateByUrl('try');
    else this.router.navigateByUrl('planos/multi');
  }

  public scrollToElement(): void {
    this.scrollEventEmitter.emit();
  }
}
