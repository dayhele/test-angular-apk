import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Theme } from 'src/assets/theme/theme';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.scss']
})
export class EnterComponent implements OnInit {
  public screenLoaded: boolean = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.screenLoaded = true;
    }, 5900);
  }

  constructor(
    public theme: Theme,
    public loginService: LoginService,
    private router: Router
  ) {}

  public login(): void {
    this.loginService.clearUnloggedDetails();
    this.router.navigateByUrl('login');
  }

  public goToFaqs(): void {
    if (this.theme.client == 'watch')
      window.open('https://watchbr.com.br/faq/');
    else this.router.navigateByUrl('/faq');
  }
}
