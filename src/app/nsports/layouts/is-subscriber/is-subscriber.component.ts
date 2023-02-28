import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { SectionService } from 'src/app/shared/services/section.service';
import { MatchesByChampionshipListData } from 'src/app/shared/interfaces/card-home';

@Component({
  selector: 'app-is-subscriber',
  templateUrl: './is-subscriber.component.html',
  styleUrls: ['./is-subscriber.component.scss']
})
export class IsSubscriberComponent implements OnInit {
  public sectionCards: MatchesByChampionshipListData[] = [];
  public carouselIsLoaded: boolean = false;

  constructor(
    private sectionService: SectionService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.initializeCarousel();
  }

  private initializeCarousel() {
    const idPerfil = parseInt(this.profileService.selectedProfile);

    if (!!idPerfil) {
      this.getSectionsByChampionship(idPerfil);
    }
  }

  private getSectionsByChampionship(idPerfil: number) {
    this.sectionService.getNSportsMatchesByChampionship(idPerfil).subscribe({
      next: (sectionData: MatchesByChampionshipListData[]) => {
        sectionData.forEach(item => {
          this.sectionCards.push(item);
        });
      },
      error: (err) => console.error(err),
      complete: () => (this.carouselIsLoaded = true)
    });
  }
}
