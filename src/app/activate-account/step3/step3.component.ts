import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Theme } from 'src/assets/theme/theme';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class Step3Component implements OnInit {
  public smsActivateData: any = {};
  public loadingScreen: boolean = true;

  constructor(public theme: Theme, private router: Router) {
    this.smsActivateData =
      JSON.parse(sessionStorage.getItem('activate_data')!) || '';

    if (this.theme.client !== 'watch') {
      this.router.navigateByUrl('/login');
    }
  }

  ngOnInit(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  public goTo(path: string): void {
    this.router.navigateByUrl(path);
  }
}
