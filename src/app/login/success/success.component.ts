import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Theme } from 'src/assets/theme/theme';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent {
  constructor(private router: Router, public theme: Theme) {}

  public goToHome(): void {
    this.router.navigateByUrl('/home');
  }
}
