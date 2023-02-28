import { Component, OnInit } from '@angular/core';
import {
  CardListData,
  MatchesByGenresListData,
  SectionCardListData
} from 'src/app/shared/interfaces/card-home';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { SectionService } from 'src/app/shared/services/section.service';
import { Theme } from 'src/assets/theme/theme';
import { PayloadLastNSportsMatches } from '../../../shared/interfaces/payload-list';

@Component({
  selector: 'app-not-is-subscriber',
  templateUrl: './not-is-subscriber.component.html',
  styleUrls: ['./not-is-subscriber.component.scss']
})
export class NotIsSubscriberComponent implements OnInit {
  public sectionCards: MatchesByGenresListData = {};
  public carouselIsLoaded: boolean = false;
  public isMultiEnvironment: boolean;

  constructor(
    private theme: Theme,
    private sectionService: SectionService,
    private profileService: ProfileService
  ) {
    this.isMultiEnvironment = this.theme.client === 'multilaser';
  }

  ngOnInit(): void {
    this.initializeCarousel();
  }

  private initializeCarousel() {
    const idPerfil = parseInt(this.profileService.selectedProfile);

    if (!!idPerfil) {
      const payload = {
        idPerfil,
        limit: 999
      };

      this.getLastNSportsMatches(payload);
    }
  }

  private getLastNSportsMatches(payload: PayloadLastNSportsMatches) {
    this.sectionService
      .getNSportsAllPreviousMatches(
        payload.idPerfil,
        payload.limit
      )
      .subscribe({
        next: (sectionData: MatchesByGenresListData) => {
          this.sectionCards = sectionData;
        },
        error: (err) => console.error(err),
        complete: () => (this.carouselIsLoaded = true)
      });
  }
}
