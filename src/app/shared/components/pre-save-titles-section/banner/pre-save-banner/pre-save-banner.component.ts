import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pre-save-banner',
  templateUrl: './pre-save-banner.component.html',
  styleUrls: ['./pre-save-banner.component.scss']
})
export class PreSaveBannerComponent implements OnInit {

  public imgBannerUrl: string = "https://watchbr-resources-v3.s3.sa-east-1.amazonaws.com/assets/bg/background_conteudos.png";
  public iconUrl: string = "https://watchbr-resources.s3.amazonaws.com/pre_saves_icons/icon-pre-save.svg";

  constructor() { }

  ngOnInit(): void {
  }

}
