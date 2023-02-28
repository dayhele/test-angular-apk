import { Component, OnInit } from '@angular/core';
import {
  CardListData,
  SectionCardListData
} from 'src/app/shared/interfaces/card-home';
import { PayloadCardTryIt } from 'src/app/shared/interfaces/payload-card-try-it';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { SectionService } from 'src/app/shared/services/section.service';
import { idParamountTryIt } from 'src/environments/environment';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card-try-it',
  templateUrl: './card-try-it.component.html',
  styleUrls: ['./card-try-it.component.scss']
})
export class CardTryItComponent implements OnInit {
  private payload!: PayloadCardTryIt;

  public sectionCards: CardListData[] = [];
  public tryItCarouselIsLoaded: boolean = false;

  public environment: any;

  constructor(
    private profileService: ProfileService,
    private sectionService: SectionService
  ) {
    this.environment = environment;
  }

  ngOnInit(): void {
    this.canInitializeCarousel();
  }

  private canInitializeCarousel() {
    const idPerfil = parseInt(this.profileService.selectedProfile);

    if (!!idPerfil) {
      this.payload = {
        idPerfil,
        id: idParamountTryIt,
        variance: 4,
        page: 1,
        size: 12
      };

      this.getParamountTryItCarousel(this.payload);
    }
  }

  private getParamountTryItCarousel(payload: PayloadCardTryIt) {
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

          this.setLoaded(true);
        },
        error: (err) => {
          this.setLoaded(true);
          console.error(err);
        },
        complete: () => {
          this.setLoaded(true);
        }
      });
  }

  private setLoaded(isLoaded: boolean) {
    this.tryItCarouselIsLoaded = isLoaded;
  }
}
