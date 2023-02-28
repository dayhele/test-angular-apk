import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Theme } from 'src/assets/theme/theme';

@Component({
  selector: 'app-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  styleUrls: ['./terms-of-use.component.scss']
})
export class TermsOfUseComponent implements OnInit {
  constructor(private route: Router, public theme: Theme) {
    if (this.theme.client != 'watch') {
      this.route.navigate(['termos', this.theme.clientRoute]);
    }
  }
  ngOnInit(): void {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  }

  public goTo(): void {
    window.open('https://watch.tv.br');
  }
}
