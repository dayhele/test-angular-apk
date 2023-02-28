import { ProfileStructure } from 'src/app/shared/interfaces/profile-structure';
import { Component, ViewChild, OnInit, Input, Output } from '@angular/core';
import { Error } from 'src/app/shared/interfaces/error';
import { PinService } from '../../shared/pin.service';
import { Profile } from 'src/app/shared/interfaces/profile';
import { Router } from '@angular/router';

enum messages {
  default = 'Crie a sua senha com 4 dígitos numéricos.',
  defaultCreate = 'A senha oferece segurança para o seu perfil, evitando que outros usuários tenham acesso.',
  different = 'As senhas estão diferentes, por favor tente novamente',
  createPin = 'A senha oferece segurança para o seu perfil, evitando que outros usuário tenham acesso.',
  editWrongPin = 'A senha informada está incorreta, favor tente novamente',
  confirmPinEdit = 'Confirme a senha anterior para a criação de uma nova.',
  confirmPinDelete = 'Confirme a senha para poder excluir a sua senha.',
  confirmDelete = 'Clique em “Sim” para excluir a senha atual.',
  emailNotFound = 'E-mail não cadastrado, tente novamente',
  emailSent = 'E-mail enviado com sucesso',
  insertEmail = 'Insira o email cadastrado na sua conta.',
  invalidEmail = 'O email não foi encontrado, tente novamente.',
  pinNew = 'Nova senha',
  pinConfirm = 'Confirmar a nova senha',
  pinCurrent = 'Senha atual',
  redefineEmail = 'Para redefinir sua senha, informe o email cadastrado',
  wrongPin = 'Senha incorreta'
}
@Component({
  selector: 'app-controle-parental-pin',
  templateUrl: './controle-parental-pin.component.html',
  styleUrls: ['./controle-parental-pin.component.scss']
})
export class ControleParentalPinComponent {
  public canEditPin: boolean = false;
  public canSaveChanges: boolean = false;
  public emailError: Error = { hasError: false };
  public messages = messages;
  public message: string;
  public messageHasError: boolean = false;
  public messageHasSuccess: boolean = false;
  public pinDeleteModal: boolean = false;
  public pinFirst: string = '';
  public pinSecond: string = '';
  public pinTopLabelCreate: string = messages.pinNew;
  public pinBotLabelCreate: string = messages.pinConfirm;
  public pinTopLabelEdit: string = messages.pinCurrent;
  public pinTopLabelEmail: string = messages.redefineEmail;
  public requestingNewPin: boolean = false;
  public selectedOption: string = '';
  public userEmail: string = '';
  public canCreatePin: boolean = false;

  @Input() public profile: Profile = {};
  @Input() public isCreatePage: boolean = true;

  @ViewChild('parentalPin') parentalPin: any;

  constructor(private pinService: PinService) {
    if (this.isCreatePage) this.message = messages.defaultCreate;
    else this.message = messages.default;
  }

  public toggleOption(option: string): void {
    if (option !== 'create' && this.isCreatePage) return;
    this.selectedOption = option;
    this.requestingNewPin = false;
    this.messageHasSuccess = false;
    this.messageHasError = false;
    this.canEditPin = false;
    this.pinFirst = '';
    this.pinSecond = '';
    this.pinTopLabelEmail = messages.redefineEmail;
    this.userEmail = '';
    this.pinDeleteModal = false;
    this.canSaveChanges = false;
    this.resetLabelMessages();

    if (option === 'create') {
      if (this.isCreatePage) this.message = messages.defaultCreate;
      else this.message = messages.default;
    } else if (option === 'edit') {
      this.message = messages.confirmPinEdit;
    } else if (option === 'delete') {
      this.message = messages.confirmPinDelete;
    } else if (option === 'forgot-pin') {
      this.message = messages.insertEmail;
      this.requestingNewPin = true;
    }
  }

  public pinValidate(): void {
    this.messageHasSuccess = false;

    if (!this.pinFirst || !this.pinSecond) return;

    if (this.pinFirst.length === 4 && this.pinSecond.length === 4) {
      if (this.pinFirst === this.pinSecond) {
        this.message = messages.default;
        this.messageHasError = false;
        this.messageHasSuccess = true;
        this.canSaveChanges = true;

        this.profile.age_bracket;
        delete this.profile.audio_default;
        delete this.profile.created_at;
        this.profile.id_perfis;
        this.profile.kids;
        this.profile.live_content;
        delete this.profile.logado;
        delete this.profile.master;
        this.profile.nome;
        this.profile.picture;
        this.profile.pin;
        delete this.profile.subtitle_default;
        delete this.profile.updated_at;
        delete this.profile.use_pin;
        delete this.profile.user_id;

        this.canCreatePin = true;
      } else {
        this.message = messages.different;
        this.messageHasError = true;
        this.pinTopLabelCreate = messages.wrongPin;
        this.pinBotLabelCreate = messages.wrongPin;
      }
    } else {
      this.message = messages.default;
      this.messageHasError = false;
      this.canSaveChanges = false;
      this.resetLabelMessages();
    }
  }

  public pinCreate(): void {
    if (this.pinFirst.length === 4) {
      this.profile.pin = this.pinFirst;
      this.profile.use_pin = true;
    }
    this.pinService
      .createPin(this.profile, this.pinFirst)
      .subscribe((res: any) => {
        this.profile.use_pin = true;
        this.resetLabelMessages();
      });
  }

  public pinEdit(): void {
    if (this.pinFirst.length === 4) {
      this.pinService
        .verifyPin(this.profile.id_perfis!, this.pinFirst)
        .subscribe((res: any) => {
          if (res.success) {
            this.pinFirst = '';
            this.canEditPin = true;
          } else {
            this.messageHasError = true;
            this.pinTopLabelEdit = messages.wrongPin;
            this.message = messages.editWrongPin;
          }
        });
    } else {
      this.messageHasError = false;
      this.message = messages.confirmPinEdit;
      this.resetLabelMessages();
    }
  }

  public pinDelete(): void {
    if (this.pinFirst.length === 4) {
      this.pinService
        .verifyPin(this.profile.id_perfis!, this.pinFirst)
        .subscribe((res: any) => {
          if (res.success) {
            this.pinDeleteModal = true;
          } else {
            this.messageHasError = true;
            this.pinTopLabelEdit = messages.wrongPin;
            this.message = messages.editWrongPin;
          }
        });
    } else {
      this.messageHasError = false;
      this.message = messages.confirmPinEdit;
      this.resetLabelMessages();
    }
  }

  public pinDeleteConfirm(): void {
    this.pinFirst = '';
    this.profile.use_pin = false;
    this.pinService
      .createPin(this.profile, this.pinFirst)
      .subscribe((res: any) => {
        this.canSaveChanges = false;
        this.toggleOption('create');
        this.resetLabelMessages();
      });
  }

  public cancelPinDelete(): void {
    this.selectedOption = 'delete';
    this.pinDeleteModal = false;
    this.pinFirst = '';
    this.toggleOption('delete');
    this.resetLabelMessages();
  }

  public saveChanges(): void {
    if (this.canSaveChanges && this.canCreatePin) {
      this.pinCreate();
      this.parentalPin.expanded = false;
      this.pinFirst = '';
      this.pinSecond = '';
      this.messageHasSuccess = false;
      this.pinDeleteModal = false;
      this.toggleOption('');
    }
  }

  public sendEmailPin(): void {
    this.pinService
      .forgotPin(this.profile.id_perfis!, this.userEmail)
      .subscribe((res: any) => {
        if (res.success) {
          this.parentalPin.expanded = false;
          this.toggleOption('create');
        } else {
          this.messageHasError = true;
          this.message = messages.emailNotFound;
          this.pinTopLabelEmail = messages.invalidEmail;
          this.emailError.hasError = true;
        }
      });
  }

  public validateEmail(): void {
    this.pinTopLabelEmail = messages.redefineEmail;
    this.emailError.hasError = false;
    this.messageHasError = false;
    this.message = messages.insertEmail;
  }

  public resetLabelMessages(): void {
    if (!this.messageHasError) {
      this.pinTopLabelCreate = messages.pinNew;
      this.pinBotLabelCreate = messages.pinConfirm;
      this.pinTopLabelEdit = messages.pinCurrent;
    }
  }
}
