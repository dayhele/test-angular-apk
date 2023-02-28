import { Location } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Router } from '@angular/router';
import { ModalOptions } from 'src/app/shared/interfaces/delete-modal-props';
import { Error } from 'src/app/shared/interfaces/error';
import { Profile } from 'src/app/shared/interfaces/profile';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { PageComponent } from '../../core/page/page/page.component';
import { image, imageKids } from './image.data';
import { imagePink } from './image-pink.data';
import { Theme } from 'src/assets/theme/theme';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: [
    './create.component.scss',
    '../shared/accordeon.scss',
    '../shared/slider.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class CreateComponent implements OnInit {
  public profile: Profile = {
    age_bracket: '18',
    master: 0,
    live_content: true,
    audio_default: 'OFF',
    subtitle_default: 'OFF',
    kids: false
  };
  public isSelectingProfileIcon: boolean;

  public images: string[] = [
    environment.bucket + 'profiles/orange-profile.png'
  ];
  public modalOptions: ModalOptions;
  public error: string = '';
  public isLoading: boolean = false;
  public imgError: Error = {};

  constructor(
    private location: Location,
    private profileService: ProfileService,
    private router: Router,
    private pageComponent: PageComponent,
    public theme: Theme
  ) {
    this.isSelectingProfileIcon = false;
    this.modalOptions = {};
  }

  ngOnInit(): void {
    this.profile.foto = this.theme.client == 'watch' ? image : imagePink;
    this.resetModalOptions();
  }

  public cancel(): void {
    this.location.back();
  }

  uploadFoto(foto: any) {
    const reader = new FileReader();

    reader.onload = () => {
      const base64Url = reader.result;

      if (typeof base64Url === 'string') {
        this.profile.foto = base64Url;
      }
    };
    reader.readAsDataURL(foto.target.files[0]);
  }

  public createProfile(): void {
    if (!this.profile.nome) {
      this.error = 'O nome é obrigatório';
      this.isLoading = false;
      return;
    }

    this.profile.kids =
      this.profile.age_bracket === '0' || this.profile.age_bracket === '10';

    this.isLoading = true;
    this.error = '';
    const date = new Date();
    this.profile.created_at = `${this.format(date, {
      year: 'numeric'
    })}-${this.format(date, { month: '2-digit' })}-${this.format(date, {
      day: '2-digit'
    })} ${this.format(date, { hour: '2-digit' })}:${this.format(date, {
      minute: '2-digit'
    })}:${this.format(date, { second: '2-digit' })}`;

    this.profile.updated_at = this.profile.created_at;
    this.profile.user_id = parseInt(this.profileService.userId);

    this.profileService.createProfile(this.profile).subscribe(
      (res) => {
        this.isLoading = false;
        if (res.error) {
          this.error =
            res.error.message || 'Ocorreu um error ao criar o perfil';
        } else {
          this.pageComponent.showToast('Perfil criado com sucesso');

          this.router.navigateByUrl('/profile/select/manage');
        }
      },
      (err) => {
        this.isLoading = false;
        this.error = 'Ocorreu um error ao criar o perfil';
      }
    );
  }

  public format(date: Date, options: Intl.DateTimeFormatOptions) {
    return new Intl.DateTimeFormat('pt-BR', options).format(date);
  }

  public openConfirmationModal(): void {
    const newModalOptions: ModalOptions = {
      isOpen: true,
      events: {
        confirm: false,
        close: false
      }
    };

    this.modalOptions = newModalOptions;
  }

  public resetModalOptions(): void {
    const newModalOptions: ModalOptions = {
      id_perfil: 0,
      isOpen: false,
      events: {
        confirm: false,
        close: false
      }
    };
    this.modalOptions = newModalOptions;
  }

  public cancelarCriacao() {
    this.router.navigateByUrl('/profile/select');
  }

  public openPopupUploadFoto() {
    document.getElementById('profileFoto')?.click();
  }

  public changeProfileKids(checked: boolean): void {
    this.profile.age_bracket = checked ? '0' : '12';

    if (this.profile.age_bracket === '0') this.profile.foto = imageKids;
    else
      this.profile.foto = environment.bucket + 'profiles/orange-profile.png';
  }
}
