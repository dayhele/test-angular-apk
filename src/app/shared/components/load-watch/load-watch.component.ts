import { style } from '@angular/animations';
import {ChangeDetectorRef, Component, HostListener, Input, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-load-watch',
  templateUrl: './load-watch.component.html',
  styleUrls: ['./load-watch.component.scss']
})
export class LoadWatchComponent implements OnInit {

  @Input() isLoaded: boolean = false;
  public isLoading: boolean = true;
  public screenX: number = 0;
  public folderName: string = 'load-watch';

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  @HostListener('window: resize', ['$event'])
  public onResize() {
    this.screenX = window.innerWidth;
  }

  ngOnInit() {
    switch (environment.client) {
      case 'multilaser':
        this.folderName = 'load-multi';
        break;
      default:
        this.folderName = 'load-watch';
    }
  }

  ngOnChanges() {
    if (this.isLoaded) {
      let _this = this;
      this.setOpacity('1');
      setTimeout(function() {
        _this.isLoading = !_this.isLoaded;
        _this.cd.detectChanges();
      }, 500);
    }
  }

  setOpacity(value: string) {
    document.getElementById("load-bg")!.style.opacity = value;
  }
}
