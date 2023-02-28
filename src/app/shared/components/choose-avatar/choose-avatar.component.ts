import { Component, OnInit } from '@angular/core';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-choose-avatar',
  templateUrl: './choose-avatar.component.html',
  styleUrls: ['./choose-avatar.component.scss']
})
export class ChooseAvatarComponent implements OnInit {
  public profileColors: string[];
  public selectedFile: ImageSnippet | undefined;

  constructor() {
    this.profileColors = [];
  }

  ngOnInit(): void {
    this.profileColors = [
      '#FF2828',
      '#E04970',
      '#E96744',
      '#DDAE4A',
      '#0047BB',
      '#7538A8'
    ];
  }

  public onFileSelected(event: Event): void {}
}
