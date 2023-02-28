import { Component, OnInit } from '@angular/core';
import { PreSaves } from '../shared/interfaces/pre-saves';
import { CheckDeviceService } from '../shared/services/check-device.service';
import { PreSaveService } from '../shared/services/pre-save.service';
import { ProfileService } from '../shared/services/profile.service';

@Component({
  selector: 'app-pre-saves',
  templateUrl: './pre-saves.component.html',
  styleUrls: ['./pre-saves.component.scss']
})
export class PreSavesComponent implements OnInit {
  public preSaves: PreSaves[] = [];
  public isLoaded: boolean = true;
  private idPerfil: number = 0;
  public checkMobile: boolean = false;

  constructor(
    private preSaveService: PreSaveService,
    private profileService: ProfileService,
    private checkDevice: CheckDeviceService
  ) {}

  ngOnInit(): void {
    this.checkMobile = this.checkDevice.isMobile();
    this.idPerfil = parseInt(this.profileService.selectedProfile);

    if (!!this.idPerfil) this.getAllPreSaves(this.idPerfil);
  }

  private getAllPreSaves(idPerfil: number) {
    this.preSaveService.getAllPreSaves(idPerfil).subscribe({
      next: (res) => this.preSaves = res,
      error: (err) => console.error(err),
      complete: () => (this.isLoaded = false)
    });
  }
}
