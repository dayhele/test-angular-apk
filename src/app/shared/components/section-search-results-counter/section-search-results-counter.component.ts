import { Device } from './../../../helpers/device';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { SectionSearchResultsCounter } from '../../interfaces/section-search-results-counter';
import { CheckDeviceService } from '../../services/check-device.service';

@Component({
  selector: 'app-section-search-results-counter',
  templateUrl: './section-search-results-counter.component.html',
  styleUrls: ['./section-search-results-counter.component.scss']
})
export class SectionSearchResultsCounterComponent implements OnInit, OnChanges {
  @Input() public search: SectionSearchResultsCounter;

  public result: string;
  public isMobile: boolean;
  public checkMobile: boolean = false;

  constructor(private checkDevice: CheckDeviceService) {
    this.checkMobile = checkDevice.isMobile();
    this.search = {};
    this.result = '';
    this.isMobile = false;
  }

  ngOnInit(): void {
    this.buildResult();
    this.isMobile = this.isMobileCheck();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.buildResult();
  }

  public buildResult(): void {
    if (this.search.results === 0) {
      this.result = 'Nenhum resultado para "' + this.search.searchTerm + '".';
    } else {
      this.result =
        (this.search.results === 1 ? 'resultado' : 'resultados') +
        ' para "' +
        this.search.searchTerm +
        '".';
    }
  }

  private isMobileCheck(): boolean {
    if (Device.isMobile()) {
      return true;
    }
    return false;
  }
}
