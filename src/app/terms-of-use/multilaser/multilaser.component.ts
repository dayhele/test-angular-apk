import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-multilaser',
  templateUrl: './multilaser.component.html',
  styleUrls: ['./multilaser.component.scss']
})
export class MultilaserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  }

}
