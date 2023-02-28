import { Router } from '@angular/router';
import { Theme } from './../../assets/theme/theme';
import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-here',
  templateUrl: './new-here.component.html',
  styleUrls: ['./new-here.component.scss']
})
export class NewHereComponent {
  environment = environment;

  constructor(private router: Router, private theme: Theme) {}

  gotoPlans() {
    if (this.theme.client === 'watch')
      window.open('https://watchbr.com.br/assinante/', '_blank');
    else {
      window.open('planos/' + this.theme.clientRoute);
    }
  }

  public goToFaqs(): void {
    if (this.theme.client == 'watch')
      window.open('https://watchbr.com.br/faq/');
    else this.router.navigateByUrl('/faq');
  }
}
