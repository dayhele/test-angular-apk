import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-erro500',
  templateUrl: './erro500.component.html',
  styleUrls: ['./erro500.component.scss']
})
export class Erro500Component implements OnInit {
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
