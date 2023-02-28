import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-libertadores-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  public img: String =
    'https://watchbr-resources.s3.amazonaws.com/conmebol/libertadores/images/libertadores_banner_interno.svg';

  constructor() {}

  ngOnInit(): void {}
}
