import { SeriesSeasons } from '../../interfaces/movie';
import { Device } from './../../../helpers/device';
import { Component, OnInit, Input } from '@angular/core';
import { MoviesAndSeriesComponent } from 'src/app/movies-and-series/movies-and-series.component';
import { environment } from '../../../../environments/environment';
import { CheckDeviceService } from '../../services/check-device.service';

@Component({
  selector: 'app-season-selector',
  templateUrl: './season-selector.component.html',
  styleUrls: ['./season-selector.component.scss']
})
export class SeasonSelectorComponent implements OnInit {
  @Input() public seriesSeasons: SeriesSeasons[];
  public isMobile: boolean;
  public environment: any;
  public dropdownActive: boolean;
  public seasonSelected: string;
  public seasonSelectedIndex: number;
  public checkMobile: boolean = false;

  constructor(
    private moviesAndSeriesComponent: MoviesAndSeriesComponent,
    public checkDevice: CheckDeviceService
  ) {
    this.checkMobile = this.checkDevice.isMobile();
    this.seriesSeasons = [];

    this.isMobile = false;
    this.dropdownActive = false;
    this.seasonSelected = '';
    this.seasonSelectedIndex = 0;

    this.environment = environment;
  }

  ngOnInit(): void {
    this.isMobile = this.isMobileCheck();
    this.seasonSelected = this.seriesSeasons[0].title!;
  }

  public dropdownToggle(): void {
    this.dropdownActive = !this.dropdownActive;
  }

  public seasonToggle(index: number): void {
    this.dropdownActive = false;
    this.seasonSelected = this.seriesSeasons[index].title!;
    this.seasonSelectedIndex = index;

    this.moviesAndSeriesComponent.loadSeasonSelected(index);
  }

  private isMobileCheck(): boolean {
    if (Device.isMobile()) {
      return true;
    }
    return false;
  }
}
