import { HomeService } from './../shared/services/home.service';
import { MainStructure } from './../shared/interfaces/main-structure';
import { ProfileService } from './../shared/services/profile.service';
import { CardBuildUrl } from './../shared/interfaces/card-build-url';
import { Component, OnInit } from '@angular/core';
import { SectionCardListData } from '../shared/interfaces/card-home';
import { BuildUrlImageService } from '../shared/services/build-url-image.service';
import { RentService } from '../shared/services/rent.service';
import {
  RentSection,
  CardProperties,
  RentSectionParams
} from './../shared/interfaces/card-default';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { CheckDeviceService } from '../shared/services/check-device.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.scss']
})
export class RentComponent implements OnInit {
  public renteds: SectionCardListData;
  public rentedsLoaded: boolean;
  public rentList: RentSection;
  public cardProperties: CardProperties;
  public id_perfil: number;
  public id: number;
  public main: MainStructure;
  public isLoading: boolean = true;
  public isMobile: boolean;
  public noSectionContent?: boolean = false;

  public checkMobile: boolean = false;

  public environment: any;

  constructor(
    private rentService: RentService,
    private buildUrlImage: BuildUrlImageService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private profileService: ProfileService,
    private homeService: HomeService,
    public checkDeviceService: CheckDeviceService,
    private checkDevice: CheckDeviceService
  ) {
    this.environment = environment;
    this.checkMobile = this.checkDevice.isMobile();
    this.main = {};
    this.renteds = {};
    this.rentList = {};
    this.cardProperties = {};
    this.id_perfil = 0;
    this.id = 10071;

    this.rentedsLoaded = false;

    this.isMobile = false;
  }

  ngOnInit(): void {
    this.isMobile = this.checkDeviceService.isMobile();
    this.activatedRoute.paramMap.subscribe((params) => {
      let itemId = Number(params.get('id'));

      if (itemId !== 0)
        this.route.navigate([`rent/media/${itemId}/${params.get('type')}`]);
    });

    const isLogged = parseInt(this.profileService.selectedProfile);
    if (isLogged) {
      this.id_perfil = isLogged;
      this.getMainInfo(this.id_perfil);
    }
  }

  private getMainInfo(id_perfil: number): void {
    this.homeService.getMainList(id_perfil).subscribe((data: MainStructure) => {
      this.main = data;
      this.getRentListSection();
    });
  }

  public async getListRented(
    id?: number,
    list?: RentSectionParams
  ): Promise<void> {
    const rentedList$ = this.rentService.getRentedList(id, this.id_perfil);
    const rentedList = await lastValueFrom(rentedList$);

    list!.data = rentedList.list;

    list!.data!.forEach(async (element: CardBuildUrl) => {
      element.imageUrl = await this.buildUrlImage.buildUrlImage(
        element?.cdn,
        list?.type === 'rented' ? element?.cover : element?.highlight
      );
      if (id === 5) {
        if (element.expire) {
          let expiredDate = new Date(element.expire);
          let today = new Date();

          element.expired = expiredDate.getTime() - today.getTime() < 0;
        } else {
          element.expired = true;
        }
      }
    });
  }

  async getRentListSection(): Promise<void> {
    this.rentService
      .getRentedSectionList(this.id_perfil, this.id)
      .subscribe(async (rentList) => {
        this.rentList = rentList;

        for (const dataList of this.rentList.lists || []) {
          await this.getListRented(dataList.id, dataList);
        }

        this.noSectionContent = rentList.lists?.every((content) => {
          return content.data?.length === 0;
        });

        this.isLoading = false;
        this.rentedsLoaded = true;
      });
  }
}
