import { Component, Input, OnInit } from '@angular/core';
import { PreSaves } from 'src/app/shared/interfaces/pre-saves';
import { ProfileService } from 'src/app/shared/services/profile.service';

@Component({
  selector: 'app-internal-card',
  templateUrl: './internal-card.component.html',
  styleUrls: ['./internal-card.component.scss']
})
export class InternalCardComponent implements OnInit {
  @Input() public preSave!: PreSaves;
  public idPerfil: number = 0;

  public warnMe: boolean = false;
  public releaseDay: string = '';
  public releaseMonth: string = '';

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {

    this.idPerfil = parseInt(this.profileService.selectedProfile);

    if (this.preSave.isPreSave && this.preSave.abrevReleaseDate && this.preSave.abrevReleaseDate?.length > 0) {
      this.releaseDay = this.preSave.abrevReleaseDate.split(' ')[0];
      this.releaseMonth = this.preSave.abrevReleaseDate.split(' ')[1];
      this.preSave.imageUrl = this.preSave.imageUrl?.replace('{image}', this.preSave.cover!);

      if (['movie', 'show'].includes(this.preSave.type!)) {
        this.preSave.fullReleaseDate = `Disponível em ${this.preSave.fullReleaseDate}`;
      } else if (this.preSave.type === "season") {
        this.preSave.fullReleaseDate = `Nova temporada em ${this.preSave.fullReleaseDate}`;
      } else {
        this.preSave.fullReleaseDate = `Novos episódios em ${this.preSave.fullReleaseDate}`;
      }
    }
  }

  public onPressed(): void {
    this.warnMe = !this.warnMe;
  }
  public warnMeTXT01() {
    return this.warnMe ? 'Aviso salvo' : 'Avisar';
  }
}
