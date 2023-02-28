import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import { CardData } from '../shared/interfaces/card';
import { Matches, PhaseList } from '../shared/interfaces/matches';
import { LibertadoresService } from '../shared/services/libertadores.service';
import { ProfileService } from '../shared/services/profile.service';

@Component({
  selector: 'app-libertadores',
  templateUrl: './libertadores.component.html',
  styleUrls: ['./libertadores.component.scss']
})
export class LibertadoresComponent implements OnInit {
  @Input() public data?: Matches;
  public id_perfil: number = 0;
  public phasesList?: PhaseList[];
  public isLoadedLive: boolean = false;
  public isLoadedPhase: boolean = false;
  public highlightsData: CardData[] = [];
  private readonly highlightsIdPhase: number = 243;

  constructor(
    private libertadores: LibertadoresService,
    private profileService: ProfileService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const isLogged = parseInt(this.profileService.selectedProfile);

    if (isLogged) {
      this.id_perfil = isLogged;
      this.loadData();
    }
  }

  public async loadData() {
    await this.getMatches();
    // await this.mountPhases();
  }
  public async getMatches() {
    this.libertadores.getMatches(this.id_perfil).subscribe(async (obj) => {
      this.isLoadedLive = false;
      this.data = await obj;
      this.libertadores
        .getPhase(this.id_perfil, this.highlightsIdPhase)
        .subscribe({
          next: (phase) => {
            this.highlightsData = phase;
          },
          error: (err) => console.error(err),
          complete: () => {
            this.isLoadedLive = true;
            this.mountPhases();
            this.cd.detectChanges();
          }
        });
    });
  }
  public async mountPhases() {
    this.isLoadedPhase = false;
    this.libertadores.getPhases().subscribe((list) => {
      if (list && list.length > 0) {
        this.phasesList = list.filter((item: any) => {
          return item.id !== this.highlightsIdPhase;
        });
        this.phasesList!.forEach((item: any) => {
          this.libertadores
            .getPhase(this.id_perfil, item.id)
            .subscribe((phase) => {
              item.data = phase;
            });
        });
      }
      this.isLoadedPhase = true;
      this.cd.detectChanges();
    });
  }
}
