import { ProfileStructure } from './../shared/interfaces/profile-structure';
import { Profile } from './../shared/interfaces/profile';
import { ProfileService } from './../shared/services/profile.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/services/login.service';

import { Device } from './../helpers/device';
import { Theme } from 'src/assets/theme/theme';

@Component({
  selector: 'app-opcoes',
  templateUrl: './opcoes.component.html',
  styleUrls: ['./opcoes.component.scss']
})
export class OpcoesComponent implements OnInit {
  isSelected: boolean = false;

  public profiles: Profile[] = [];
  public profile: Profile = {};
  public isMobile: boolean;

  public profileStructure: ProfileStructure = {};

  colors = [
    '--red',
    '--pink-400',
    '--orange-400',
    '--yellow-400',
    '--blue-400',
    '--purple-300'
  ];

  public loadImage: boolean = false;

  constructor(
    private profileService: ProfileService,
    private loginService: LoginService,
    public theme: Theme
  ) {
    this.isMobile = Device.isMobile();
  }

  ngOnInit(): void {
    this.getUser();
  }

  public onLogoutClick(): void {
    this.loginService.logout();
  }

  public getUser(): void {
    this.profileService.storageProfileObservable.subscribe((data) => {
      if (data == 'selected' || data == 'loaded') this.isSelected = true;
      else if (data == 'removed') this.isSelected = false;
      this.profileService.getUserProfileList().subscribe((profiles) => {
        if (profiles.success) {
          this.profileStructure = profiles.success;
          let _profile;
          this.getProfilesImage(profiles.success.data!);
          profiles.success.data?.map((profile) => {
            if (
              this.profileService.selectedProfile ===
              profile.id_perfis?.toString()
            ) {
              _profile = profile;
            }
          });
          if (_profile) {
            this.profile = _profile;
          } else {
            this.profile = {};
          }
        }
      });
    });
    if (this.profileService.loadProfile()) {
      this.isSelected = true;
    }
  }

  public getProfilesImage(profiles: Profile[]): void {
    profiles.map((profile, index) => {
      profile.foto = this.buildUrlImage('perfil', profile.foto);
      profile.backgroundColor = this.colors[index];
    });
    this.loadImage = true;
  }

  public buildUrlImage(
    type: 'perfil' | 'hightlight',
    imageName: string | undefined
  ): string {
    if (imageName) {
      const url: string | undefined =
        type === 'perfil'
          ? this.profileStructure?.cdnperfil + imageName
          : this.profileStructure?.cdnhighlight + imageName;
      return url!;
    }
    return 'assets/icons/profile/default.svg';
  }
}
