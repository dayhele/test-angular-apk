import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Theme } from 'src/assets/theme/theme';
import { LoginService } from '../shared/services/login.service';
import { HomeService } from '../shared/services/home.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  constructor(
    private route: Router,
    public theme: Theme,
    public loginService: LoginService,
    private homeService: HomeService,
    private activatedRoute: ActivatedRoute
  ) {
    this.loginService.clearUnloggedDetails();

    if (this.theme.client != 'watch')
      this.route.navigate([
        'welcome',
        theme.client === 'multilaser' ? 'multi' : theme.client
      ]);

    sessionStorage.setItem('isUnloggedSession', 'true');

    this.homeService.getUnloggedToken().subscribe((data) => {
      if (environment.app) return;

      this.loginService.tokenUnlogged = data.token;
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      if (this.getCurrentPage() === '/welcome/find') {
        this.scrollToElement('scrollToHere');
      }
    }, 1000);
  }

  public getCurrentPage(): string {
    return this.route.url;
  }

  public scrollToElement(element: string): void {
    document.getElementById(element)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  }
}
