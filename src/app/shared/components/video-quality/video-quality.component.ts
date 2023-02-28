import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Source } from '../../interfaces/source';

@Component({
  selector: 'app-video-quality',
  templateUrl: './video-quality.component.html',
  styleUrls: ['./video-quality.component.scss']
})
export class VideoQualityComponent implements OnInit {
  public isActive: boolean;
  public environment: any;

  @Input() public sources: Source[];
  @Output() public selectVideoQuality: EventEmitter<{
    source: Source;
    id: number;
  }> = new EventEmitter();

  public selectedIndex = 0;

  constructor() {
    this.isActive = false;
    this.sources = [];
    this.environment = environment;
  }

  ngOnInit(): void {
    let savedQuality = localStorage.getItem('videoQuality');
    this.selectedIndex = this.sources.findIndex((s) => s.label == savedQuality);
    if (this.selectedIndex == -1) this.selectedIndex = 0;
  }

  public toggleMenu(): void {
    this.isActive = !this.isActive;
  }

  public close(): void {
    this.isActive = false;
  }

  public toggleVideoQuality(index: number): void {
    this.selectedIndex = index;
    this.selectVideoQuality.emit({ source: this.sources[index], id: index });
  }

  convertMbps(value: number): String {
    return (value / 1000000).toFixed(2).replace('.', ',');
  }
}
