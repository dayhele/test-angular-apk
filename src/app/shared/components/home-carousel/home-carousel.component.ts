import {
  Component,
  HostListener,
  Input,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { Router } from '@angular/router';
import { buildUrlImage } from 'src/utils/buildUrlImage';
import { MainStructure } from '../../interfaces/main-structure';
import { Movie } from '../../interfaces/movie';
import { CheckDeviceService } from '../../services/check-device.service';
import { Theme } from 'src/assets/theme/theme';
import { BannerSecondaryTypes } from '../../interfaces/banners';

@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.scss']
})
export class HomeCarouselComponent implements OnInit {
  public screen_x: number;
  public checkMobile: boolean = false;
  public bannerSecondaryTypes = BannerSecondaryTypes;

  @Input() main: MainStructure;
  @Input() movieList: Movie[];
  @Input() isMobile: boolean;
  @Input() idPerfil: number = 0;

  public buildUrl: (
    cdnId: number | undefined,
    imageName: string | undefined,
    main: MainStructure
  ) => void;

  @HostListener('window: resize', ['$event'])
  public onResize() {
    this.screen_x = window.innerWidth;
  }

  constructor(
    private route: Router,
    public theme: Theme,
    private checkDeviceService: CheckDeviceService
  ) {
    this.checkMobile = checkDeviceService.isMobile();
    this.screen_x = 0;
    this.main = <MainStructure>{};
    this.movieList = <Movie[]>[];
    this.buildUrl = buildUrlImage;
    this.isMobile = false;
  }

  ngOnInit(): void {
    if (window) {
      this.screen_x = window.innerWidth;
    }
  }

  public displayMovie(id: number | undefined): Movie | undefined {
    let _movie;
    if (id) {
      for (let i = 0; i < this.movieList.length; i++) {
        if (this.movieList[i].id == id) {
          _movie = this.movieList[i];
          break;
        }
      }
    }
    return _movie;
  }

  public movieIndex(id: number): number {
    for (let i = 0; i < this.movieList!.length; i++) {
      if (this.movieList![i].id === id) return i;
    }
    return -1;
  }

  public checkClick(id: number, type: string, link_banner: string | undefined): void {
    this.isMobile ? this.goToDetails(id, type, link_banner) : '';
  }

  public goToDetails(id: number, type: string, link_banner: string | undefined): void {
    if (type !== 'banner') {
      this.route.navigateByUrl(`/details/${id}/${type}`);
    } else {
      if (link_banner && link_banner?.length > 0) {
        window.open(link_banner, '_self');
      }
    }
  }
}
