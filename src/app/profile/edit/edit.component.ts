import { Theme } from './../../../assets/theme/theme';
import { PageComponent } from 'src/app/core/page/page/page.component';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Profile } from '../../shared/interfaces/profile';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: [
    './edit.component.scss',
    '../shared/accordeon.scss',
    '../shared/slider.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class EditComponent {
  public profile: Profile = {};
  public deleteProfileModal: boolean = false;
  public environment: any;

  constructor(
    private _router: Router,
    private router: ActivatedRoute,
    private profileService: ProfileService,
    private pageComponent: PageComponent,
    public theme: Theme
  ) {
    let _profile = localStorage.getItem('profile-edit');
    if (_profile) {
      this.profile = JSON.parse(_profile);

      this.profile.picture = this.profile.foto;

      delete this.profile.cdnperfil;
      delete this.profile.foto;

      localStorage.removeItem('profile-edit');
    } else {
      this._router.navigate(['/profile/select/manage']);
    }

    this.profile.age_bracket = this.profile.age_bracket?.toString();
    this.environment = environment;
  }

  public uploadFoto(foto: any) {
    const reader = new FileReader();

    reader.onload = () => {
      const base64Url = reader.result;

      if (typeof base64Url === 'string') {
        this.profile.foto = base64Url;
        this.profile.picture = base64Url;
      }
    };
    reader.readAsDataURL(foto.target.files[0]);
  }

  public salvar() {
    if (this.profile.pin) this.profile.use_pin = true;

    this.profile.kids =
      this.profile.age_bracket === '0' || this.profile.age_bracket === '10';

    this.profileService.saveProfile(this.profile).subscribe((res: any) => {
      if (res?.error) {
        this.pageComponent.showToast(
          'Ocorreu um erro ao salvar o perfil, por favor, tente novamente'
        );
      } else {
        this.pageComponent.showToast(
          'As alterações foram realizadas com sucesso'
        );
        this._router.navigate(['/profile/select/manage']);
      }
    });
  }

  public reqDelete(): void {
    this.profileService.deleteProfile(this.profile.id_perfis!).subscribe();
    this.profileService.getUserProfileList().subscribe((profiles) => {
      this.profileService.setProfileList(profiles);
    });
  }

  public deleteProfile(): void {
    if (this.profile.id_perfis) {
      const subDeleteProfile = this.pageComponent
        .showToast('Seu perfil foi excluído com sucesso', true)
        .subscribe(() => {
          this.reqDelete();
        });

      this.pageComponent.assignToastFunction(subDeleteProfile);

      // Guarda o ProfileId excluído para ocultar na seleção de perfis
      localStorage.setItem(
        'deleted_profile_id',
        this.profile.id_perfis.toString()
      );
      

      this._router.navigate(['//profile/select/manage'], {});
    }
  }
}
