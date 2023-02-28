import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { PayloadList } from '../shared/interfaces/payload-list';
import { CardProperties } from 'src/app/shared/interfaces/card-default';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { SectionService } from 'src/app/shared/services/section.service';
import { CardListData, SectionCardListData } from 'src/app/shared/interfaces/card-home';
import { idNSportsMatches } from 'src/environments/environment';
import { AccountService } from '../shared/services/account.service';

@Component({
  selector: 'app-nsports',
  templateUrl: './nsports.component.html',
  styleUrls: ['./nsports.component.scss']
})
export class NsportsComponent implements OnInit {
  private payload!: PayloadList;

  public properties: CardProperties;
  public canLoad: boolean = false;
  public carouselIsLoaded: boolean = false;
  public sectionCards: CardListData[] = [];
  public isSubscriber!: boolean;

  constructor(
    private profileService: ProfileService,
    private sectionService: SectionService,
    private accountService: AccountService,
    private cd: ChangeDetectorRef
  ) {
    
    this.properties = {
      orientation: 'horizontal',
      isLive: true,
      secondDescription: true,
      day: true,
      sportTitle: true
    };

  }

  ngOnInit(): void {
    this.getAccountSubscribes();
  }

  private getAccountSubscribes(): void {
    this.accountService.getAccountSubscribes().subscribe((subscribes) => {
      this.isSubscriber = subscribes.success?.marketPlace?.nsports || false;
      
      this.canLoad = true;

      this.initializeCarousel();
      this.cd.detectChanges();
    });
  }

  private initializeCarousel() {
    const idPerfil = parseInt(this.profileService.selectedProfile);

    if (!!idPerfil) {
      this.payload = {
        idPerfil,
        id: idNSportsMatches,
        page: 1,
        size: 60,
        variance: 4
      };

      this.getNSportsLiveMatches(this.payload);
    }
  }

  private getNSportsLiveMatches(payload: PayloadList) {
    this.sectionService
      .getSectionItensList(
        payload.idPerfil,
        payload.id,
        payload.variance,
        payload.page,
        payload.size
      )
      .subscribe({
        next: (sectionData: SectionCardListData) => {
          sectionData.list?.forEach((section) => {
            this.sectionCards.push(section);
          });
        },
        error: (err) => console.error(err),
        complete: () => {
          this.carouselIsLoaded = true;
          this.cd.detectChanges();
        }
      });
  }
}
