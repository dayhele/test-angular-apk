import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { MainStructure } from 'src/app/shared/interfaces/main-structure';
import { HomeService } from '../shared/services/home.service';

@Component({
  selector: 'app-hbo-max',
  templateUrl: './hbo-max.component.html',
  styleUrls: ['./hbo-max.component.scss']
})
export class HboMaxComponent implements OnInit {
  public isLigga: boolean = false;

  constructor(
    private homeService: HomeService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.getMainInfo(Number(this.profileService.selectedProfile));
  }

  public getMainInfo(idPerfil: number): void {
    this.homeService.getMainList(idPerfil).subscribe((data: MainStructure) => {
      this.isLigga = data.isLigga!;
    });
  }
}
