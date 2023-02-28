import { Component, OnInit } from '@angular/core';
import { Theme } from 'src/assets/theme/theme';
import { environment } from 'src/environments/environment';
import SwiperCore, { Navigation, Pagination } from 'swiper';
SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'app-section-slide',
  templateUrl: './section-slide.component.html',
  styleUrls: ['./section-slide.component.scss']
})
export class SectionSlideComponent implements OnInit {
  public isMobile: boolean = false;
  public checkMobile: boolean = false;
  public environment: any;

  constructor(public theme: Theme) {
    this.environment = environment;
  }

  ngOnInit(): void {}

  scrollToSection() {
    const access = document.getElementById('section5');
    access?.scrollIntoView({ behavior: 'smooth' });
  }

  public backgroundCarousel = [
    { image: environment.bucket + 'bg/institucional/banner-bg1.png' },
    { image: environment.bucket + 'bg/institucional/banner-bg2.png' },
    { image: environment.bucket + 'bg/institucional/banner-bg3.png' }
  ];
}
