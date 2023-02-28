import { LibertadoresService } from './../../../services/libertadores.service';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { CheckDeviceService } from 'src/app/shared/services/check-device.service';
import { Router } from '@angular/router';
import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import { Theme } from 'src/assets/theme/theme';
import { CardProperties } from 'src/app/shared/interfaces/card-default';
import { Device } from 'src/app/helpers/device';
import { CardData } from 'src/app/shared/interfaces/card';
import { HomeBnnerList } from 'src/app/shared/interfaces/matches';
import {CardListData} from "../../../interfaces/card-home";

@Component({
  selector: 'app-libertadores-section',
  templateUrl: './libertadores-section.component.html',
  styleUrls: ['./libertadores-section.component.scss']
})
export class LibertadoresSectionComponent implements OnInit {
  public checkMobile: boolean = false;

  @Input() public hasExploreButton: boolean = true;
  @Input() public hasNavigation: boolean = true;
  @Input() public allowTouchMove: boolean = true;
  @Input() public text: string = '';
  @Input() public viewMore: string = 'libertadores';
  @Input() public data: any = [];
  @Input() public title: string = "";

  public dataCards?: HomeBnnerList;
  public bannerImg: string =
    'https://watchbr-resources.s3.amazonaws.com/conmebol/libertadores/images/libertadores_bg.svg';
  public logoImg: string =
    'https://watchbr-resources.s3.amazonaws.com/conmebol/libertadores/images/libertadores_paramount_logo.svg';
  public cardProperties: CardProperties = {
    orientation: 'horizontal',
    isLive: true,
    secondDescription: true,
    day: true,
    sportTitle: true,
    rentable: false,
    rentMovieTitle: false
  };
  public isMobile: boolean = false;
  //public title?: string;
  public description: string = '';
  public id_perfil: number = 0;
  public matchesLibertadores?: CardData[];
  public orientation?: string;
  public isLoaded?: boolean = false;

  constructor(
    public router: Router,
    public theme: Theme,
    public checkDevice: CheckDeviceService,
    public profileService: ProfileService,
    public libertadoresService: LibertadoresService,
    private cd: ChangeDetectorRef
  ) {
    this.checkMobile = this.checkDevice.isMobile();
    this.isMobile = Device.isMobile();
  }
  ngOnInit(): void {
    const isLogged = parseInt(this.profileService.selectedProfile);

    if (isLogged) {
      this.id_perfil = isLogged;
      //this.getList();
      this.setData();
    }
  }

  public goTo(path: string) {
    this.router.navigateByUrl(path);
  }
  public viewMoreClick(): void {
    this.router.navigateByUrl(this.viewMore);
  }

  public getList() {
    this.isLoaded = false;
    this.libertadoresService.getList(this.id_perfil).subscribe((res) => {
      this.dataCards = res;
      this.matchesLibertadores = this.dataCards?.list;
      if (res.list.length > 0) this.cardProperties.orientation = res.list[0].orientation;
      this.isLoaded = true;
    });
  }

  public setData() {
    this.dataCards = { PageCustomBanner: "", PageCustomDescription: "", PageCustomIcon: "", PageCustomTitle: this.title,
      current_page: 1, list: [], page_size: 12, pages: 1, total: 1 }
    this.matchesLibertadores = this.data;
    if (this.data.length > 0) this.cardProperties.orientation = this.data[0].orientation;
    this.isLoaded = true;
    this.cd.detectChanges();
  }
}
