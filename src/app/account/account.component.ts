import { Router } from '@angular/router';
import { MySubscriptions } from './../shared/interfaces/my-subscriptions';
import { LoginService } from 'src/app/shared/services/login.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { ProfileService } from '../shared/services/profile.service';
import { Profile } from '../shared/interfaces/profile';
import { Error } from '../shared/interfaces/error';
import { ChangePasswordResponse } from '../shared/interfaces/change-password-response';
import { AccountService } from '../shared/services/account.service';
import { AccountData, AccountUpdate } from '../shared/interfaces/account';
import { ModalOptions } from '../shared/interfaces/delete-modal-props';
import { Theme } from 'src/assets/theme/theme';
import { PlanAccessControlService } from '../shared/services/plan-access-control.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  public screen_x: number;
  public profileSelectedId: number;
  public profileSelected: Profile;
  public profileMaster: Profile;
  public profilesLoaded: boolean;
  public isEditingPassword: boolean;
  public isEditingSubscribes: boolean;
  public passwordCurrent: string;
  public passwordFirst: string;
  public passwordSecond: string;
  public error: Error;
  public emailError: Error;
  public success: boolean;
  public accountSubscriptions: MySubscriptions = {};
  public isEditingEmail: boolean;
  public recoveryEmail: string;
  public emailText: string;
  public isLoadingRequest: boolean;
  public modalOptions: ModalOptions;
  public confirmationModalOptions: ModalOptions;
  public planId: number = 0;

  public account: AccountData;
  public updateAccount: AccountUpdate;
  public isEditingAccount: boolean;
  public isShowCancelPopUp: boolean;
  public isShowCancelConfirmationPopUp: boolean;

  public passwordChanged: boolean;
  public selectedCard: string;
  public environment: any = environment;

  @HostListener('window: resize', ['$event'])
  public onResize() {
    this.screen_x = window.innerWidth;
  }

  constructor(
    private profileService: ProfileService,
    private loginService: LoginService,
    private accountService: AccountService,
    private router: Router,
    public theme: Theme,
    public planAcessControl: PlanAccessControlService
  ) {
    this.isLoadingRequest = false;
    this.screen_x = 0;
    this.modalOptions = {};
    this.confirmationModalOptions = {};
    this.profileSelectedId = 0;
    this.profileSelected = {};
    this.profileMaster = {};
    this.profilesLoaded = false;
    this.isEditingPassword = false;
    this.isEditingSubscribes = false;
    this.passwordCurrent = '';
    this.passwordFirst = '';
    this.passwordSecond = '';
    this.error = { hasError: false };
    this.emailError = { hasError: false };
    this.success = false;
    this.isEditingEmail = false;
    this.isShowCancelPopUp = false;
    this.isShowCancelConfirmationPopUp = false;
    this.recoveryEmail = '';
    this.emailText = 'Não há email de recuperação cadastrado';
    this.account = {};
    this.updateAccount = {
      id: '',
      pNome: '',
      pEmail: '',
      pSexo: '',
      pTelefone: '',
      pNascimento: '',
      pCep: '',
      pPais: '',
      pEstado: '',
      pCidade: '',
      pEndereco: '',
      pNumero: '',
      pComplemento: ''
    };
    this.isEditingAccount = false;

    this.passwordChanged = false;
    this.selectedCard = '';
  }

  ngOnInit(): void {
    this.screen_x = window.innerWidth;
    this.profileSelectedId = parseInt(this.profileService.selectedProfile);
    this.getAccountEmail();
    this.getProfileList();
    this.showSelectedCard();
    this.getSubscribes();
  }

  public getAccountEmail(): void {
    this.getAccountData(localStorage.getItem('email')!);
  }

  public getAccountData(email: string): void {
    this.accountService.getAccountData(email).subscribe((data) => {
      this.account = data.Result!;
    });
  }

  public updateAccountData(): void {
    this.isLoadingRequest = true;
    if (this.updateAccount.pNome === '')
      this.updateAccount.pNome = this.account.name || '';

    this.updateAccount.id = this.profileSelectedId.toString();
    this.updateAccount.pEmail = this.account.email || '';

    this.accountService.updateAccountData(this.updateAccount).subscribe({
      next: () => {
        this.isEditingAccount = false;
        this.isLoadingRequest = false;
      },
      error: () => {
        this.isLoadingRequest = false;
      }
    });
  }

  public getProfileList(): void {
    this.profileService.profilesObservable.subscribe((profiles) => {
      this.getProfiles(profiles.success?.data!);
    });
  }

  public getProfiles(profiles: Profile[]) {
    for (let i = 0; i < profiles.length; i++) {
      let profile = profiles[i];

      if (this.profileSelectedId === profile.id_perfis)
        this.profileSelected = profile;

      if (profile.master === 1) this.profileMaster = profile;

      let profileMasterLength = Object.keys(this.profileMaster).length;
      let profileSelectedLength = Object.keys(this.profileSelected).length;
      if (profileMasterLength > 0 && profileSelectedLength > 0) {
        this.profilesLoaded = true;
        return;
      }
    }
  }

  public getSubscribes(): void {
    this.accountService.getAccountSubscribes().subscribe((subscription) => {
      this.accountSubscriptions = subscription;
      this.settingPlanId(subscription);
    });
  }

  public settingPlanId(subscription: any): void {
    this.planId = subscription.success.data.tickets.map((plan: any) => {
      return plan.plano_id;
    });
  }

  public checkFields(): boolean {
    if (
      this.passwordCurrent === '' ||
      this.passwordFirst === '' ||
      this.passwordSecond === ''
    ) {
      this.error.hasError = true;
      this.error.message = 'Preencha os campos corretamente.';
      return true;
    }
    if (this.passwordFirst !== this.passwordSecond) {
      this.error.hasError = true;
      this.error.message =
        'Desculpe, as senhas estão diferentes. Tente novamente.';
      return true;
    }
    return false;
  }

  public confirmPasswordChanges(): void {
    if (!this.checkFields()) {
      this.loginService
        .changePassword(this.passwordFirst, this.passwordCurrent)
        .subscribe(
          (data: ChangePasswordResponse) => {
            if (data.success) {
              this.success = data.success!;
              this.isEditingPassword = false;
              this.passwordCurrent = '';
              this.passwordFirst = '';
              this.passwordSecond = '';
              this.passwordChanged = true;
            } else {
              this.error.hasError = true;
              this.error.message = data.error.message;
            }
          },
          (error) => {
            this.error.hasError = true;
            this.error.message = error.error.message;
          }
        );
    }
  }

  public validateEmail(email: string): boolean {
    const regularExpression =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(String(email).toLowerCase());
  }

  public applyEmailChanges(): void {
    if (this.recoveryEmail !== '' && this.validateEmail(this.recoveryEmail)) {
      this.emailText = this.recoveryEmail;
      this.isEditingEmail = false;
      this.emailError.hasError = false;
      this.recoveryEmail = '';
    } else {
      this.emailError.hasError = true;
      this.emailError.message = 'Por favor, insira um email válido.';
    }
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

  public resetModalOptions(modalOptions?: ModalOptions): void {
    const newModalOptions: ModalOptions = {
      id_perfil: 0,
      isOpen: false,
      events: {
        confirm: false,
        close: false
      }
    };

    modalOptions
      ? (modalOptions = newModalOptions)
      : (this.modalOptions = newModalOptions);
  }

  public cancelConfirmation(): void {
    this.accountService.cancelAccount().subscribe(() => {
      this.loginService.logout();
    });
  }

  public cancelPlan(_idPlan: number): void {
    this.accountService.cancelMarketplace(_idPlan).subscribe((data) => {
      if (!data.HasError) alert('plano canelado ' + _idPlan);
      else alert('erro ao cancelar');
    });
  }

  public toogleCancelConfirmationPopUp(): void {
    this.isShowCancelConfirmationPopUp = true;
  }

  public showSelectedCard(): void {
    this.accountService.getSelectedCard().subscribe((data) => {
      if (data.hasError) {
        this.selectedCard = data.ErrorMessage;
      } else {
        this.selectedCard = `**** **** **** ${data.Result.card}`;
      }
    });
  }

  public goToEditPaymentCard(): void {
    this.router.navigateByUrl(`/pagamento/atualizar/${this.planId}`);
  }
}
