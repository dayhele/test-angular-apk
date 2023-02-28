import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Error } from 'src/app/shared/interfaces/error';
import { Profile } from 'src/app/shared/interfaces/profile';
import { ProfileStructureResponse } from 'src/app/shared/interfaces/profile-structure-response';
import { ProfileService } from 'src/app/shared/services/profile.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {
  public isModalOpen: boolean;
  public code: string;
  public imgSrc: string;
  public error: Error;
  public profile: Profile;

  constructor(private profileService: ProfileService, private router: Router) {
    this.profile = {};
    this.imgSrc = '';
    this.code = '';
    this.error = {
      hasError: false,
      message: 'Código Inválido'
    };
    this.isModalOpen = false;
  }

  ngOnInit(): void {
    this.getProfileList();
  }

  public getProfileList(): void {
    this.profileService.getUserProfileList().subscribe({
      next: (lProfiles) => {
        this.getSelectedProfile(lProfiles);
      }
    });
  }

  public getSelectedProfile(profileList: ProfileStructureResponse): void {
    if (profileList.success && profileList.success.data) {
      const _profile = profileList.success.data.find(
        (profile) =>
          profile.id_perfis === Number(this.profileService.selectedProfile)
      );

      if (_profile) {
        this.profile = _profile;
        this.imgSrc = `${profileList.success.cdnperfil}${_profile.foto}`;
      }
    }
  }

  public submit(): void {
    this.profileService.sendActivationCode(this.code).subscribe({
      next: (res) => {
        if (!res.valid) {
          this.error.hasError = true;
          this.error.message = 'Código Inválido';
        } else this.isModalOpen = true;
      },
      error: (err) => {
        this.error.hasError = err.error.HasError;
        this.error.message = err.error.Message;
      }
    });
  }

  public watchNow(): void {
    this.router.navigate(['/home']);
  }
}
