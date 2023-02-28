import { Theme } from 'src/assets/theme/theme';
import { PinService } from './../shared/pin.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Device } from 'src/app/helpers/device';
import { ModalOptions } from 'src/app/shared/interfaces/delete-modal-props';
import { Profile } from 'src/app/shared/interfaces/profile';
import { ProfileStructure } from 'src/app/shared/interfaces/profile-structure';
import { ProfileStructureResponse } from 'src/app/shared/interfaces/profile-structure-response';
import { CheckConnectionService } from 'src/app/shared/services/check-connection.service';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { environment } from 'src/environments/environment';
import { CheckDeviceService } from 'src/app/shared/services/check-device.service';
import { PageComponent } from 'src/app/core/page/page/page.component';
@Component({
  selector: 'app-profile-select',
  templateUrl: './profile-select.component.html',
  styleUrls: ['./profile-select.component.scss']
})
export class ProfileSelectComponent implements OnInit {
  public environment: any;
  public profileList: ProfileStructure;
  public screen_x: number;
  public loading: boolean;
  public isEditingProfile: boolean;
  public modalOptions: ModalOptions;
  public loadingDelete: boolean;
  public isMobile: boolean;
  public currentRoute: string;
  public showPinModal: boolean = false;
  public selectedProfile: Profile = {};
  public verifyPinSuccess?: boolean = undefined;
  public verifyEmailSuccess?: boolean = undefined;

  private profileListDataTemp?: Profile[];

  public isManagePage: boolean = false;

  public checkMobile: boolean = false;

  @HostListener('window: resize', ['$event'])
  public onResize() {
    this.screen_x = window.innerWidth;
  }

  constructor(
    private profileService: ProfileService,
    private checkConnectionService: CheckConnectionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private pinService: PinService,
    private checkDevice: CheckDeviceService,
    private pageComponent: PageComponent,
    public theme: Theme
  ) {
    this.checkMobile = this.checkDevice.isMobile();
    this.profileList = {};
    this.screen_x = 0;
    this.loading = true;
    this.isEditingProfile = false;
    this.environment = environment;
    this.modalOptions = {
      isOpen: false,
      id_perfil: 0,
      events: {
        close: false,
        confirmDelete: false
      }
    };
    this.loadingDelete = false;
    this.currentRoute = '';

    this.isMobile = Device.isMobile();
  }

  ngOnInit(): void {
    this.profileService.logoutProfile();
    this.getProfileList();

    if (window) {
      this.screen_x = window.innerWidth;
    }

    this.checkConnectionService.allowChange = true;

    this.activatedRoute.paramMap.subscribe((params) => {
      this.isManagePage = !!params.get('manage');
    });
  }

  public editProfile(_profile: Profile): void {
    _profile.foto_full_path = _profile.foto;
    this.selectedProfile = _profile;

    this.isEditingProfile = true;

    if (_profile.use_pin) {
      this.verifyEmailSuccess = undefined;
      this.verifyPinSuccess = undefined;
      this.showPinModal = true;
    } else {
      this.goToProfileEdit(this.selectedProfile);
    }
  }

  public goToProfileEdit(_profile: Profile): void {
    _profile.cdnperfil = this.profileList?.cdnperfil;
    localStorage.setItem('profile-edit', JSON.stringify(_profile));
    this.router.navigateByUrl(`/profile/edit/${_profile.id_perfis}`);
  }

  public getProfileList(): void {
    this.profileService
      .getUserProfileList()
      .subscribe((profiles: ProfileStructureResponse) => {
        if (profiles.success) {
          this.profileService.setProfileList(profiles);

          this.profileList = profiles.success;
          this.loading = false;

          if (profiles.success.data && profiles.success.data.length > 0) {
            this.profileService.saveUserId(profiles.success.data[0].user_id!);
          }

          /*
            Regra:
              verificar se houve um perfil excluído, se sim, ocultá-lo até a exclusão total
              após 5 segundos e mostrá-lo caso o usuário clique em "Desfazer" a exclusão.
          */
          const deletedProfileId = localStorage.getItem('deleted_profile_id');
          if (deletedProfileId) {
            this.storeAndHideDeletedProfile(parseInt(deletedProfileId));
            this.checkUndoButtonPressed();
          }
        }
        document.getElementById('loading')?.classList.remove('active');
        document
          .getElementsByTagName('body')
          ?.item(0)
          ?.classList.remove('no-scroll');
      });
  }
  public verifyPin(_pin: string): void {
    this.verifyPinSuccess = undefined;
    this.pinService
      .verifyPin(this.selectedProfile.id_perfis!, _pin)
      .subscribe((res) => {
        this.verifyPinSuccess = res.success;
        if (this.verifyPinSuccess) {
          this.showPinModal = false;
          if (this.isEditingProfile) {
            this.goToProfileEdit(this.selectedProfile);
          } else {
            this.enterProfile(
              this.selectedProfile.id_perfis,
              this.selectedProfile.age_bracket,
              this.selectedProfile
            );
          }
        }
      });
  }

  public verifyEmail(_email: string): void {
    this.verifyEmailSuccess = undefined;
    this.pinService
      .forgotPin(this.selectedProfile.id_perfis!, _email)
      .subscribe((res) => {
        this.verifyEmailSuccess = res.success;
      });
  }

  private storeAndHideDeletedProfile(deletedProfileId: number) {
    this.profileListDataTemp = this.profileList?.data
      ? JSON.parse(JSON.stringify(this.profileList?.data))
      : null;
    this.profileList.data = this.profileListDataTemp?.filter(
      (wh) => wh.id_perfis !== deletedProfileId
    );
    localStorage.removeItem('deleted_profile_id');
  }

  private checkUndoButtonPressed() {
    let checkUndoButtonCount = 1;
    const intervalCheckButton = setInterval(() => {
      // limite de 5 segundos para checar se perfil foi excluído
      if (checkUndoButtonCount === 6) {
        clearInterval(intervalCheckButton);
        return;
      }

      if (localStorage.getItem('undo_button_pressed')) {
        this.profileList.data = this.profileListDataTemp;
        localStorage.removeItem('undo_button_pressed');
        clearInterval(intervalCheckButton);
      }
      checkUndoButtonCount++;
    }, 1000);
  }

  public buildUrlImage(
    type: 'perfil' | 'hightlight',
    imageName: string | undefined
  ): string {
    if (imageName) {
      const url: string | undefined =
        type === 'perfil'
          ? this.profileList?.cdnperfil + imageName
          : this.profileList?.cdnhighlight + imageName;
      return url!;
    }
    return '';
  }

  public selectProfile(_profile: Profile): void {
    if (this.isEditingProfile) return;
    _profile.foto_full_path = _profile.foto;
    this.selectedProfile = _profile;

    if (_profile.use_pin) {
      this.verifyEmailSuccess = undefined;
      this.verifyPinSuccess = undefined;
      this.showPinModal = true;
    } else
      this.enterProfile(_profile.id_perfis, _profile.age_bracket, _profile);
  }

  public enterProfile(
    id_perfil: number | undefined,
    age_bracket: string | undefined | null,
    selected_profile: Profile
  ): void {
    selected_profile.foto = selected_profile.foto_full_path;
    this.profileService.profileSelected = selected_profile;

    const notify = localStorage.getItem('directvgo-notify');
    if (!age_bracket) {
      if (notify == 'not-notify-child-profile')
        localStorage.setItem('directvgo-notify', 'notify');
    } else if (age_bracket) {
      if (notify != 'not-notify')
        localStorage.setItem('directvgo-notify', 'not-notify-child-profile');
    }

    //TODO: não chamar o page component
    this.pageComponent.getMainInfo(id_perfil!);
    this.profileService.selectProfile(id_perfil);
  }

  public getTitle(): string {
    if (this.isManagePage) {
      const prefix = 'Gerenciar perfis';

      return this.isEditingProfile
        ? `${prefix} ${this.profileList?.data?.length}/${
            this.profileList?.limitProfile || '--'
          }`
        : prefix;
    } else return 'Quem está assistindo?';
  }
}
