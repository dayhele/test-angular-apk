import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-erro404',
  templateUrl: './erro404.component.html',
  styleUrls: ['./erro404.component.scss']
})
export class Erro404Component implements OnInit {
  public countdown: number = 10;

  constructor(private router: Router) {}

  ngOnInit(): void {
    let _interval = setInterval(() => {
      if (this.countdown === 1) {
        clearInterval(_interval);
        this.router.navigateByUrl('home');
        return;
      }
      this.countdown--;
    }, 1000);
  }
}
