import { SplashService } from './../../../shared/services/splash.service';
import { Subject, Subscription, BehaviorSubject } from 'rxjs';
import { ToastSuccessComponent } from './../../../shared/components/toast-success/toast-success.component';
import {
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Device } from 'src/app/helpers/device';
import { Profile } from 'src/app/shared/interfaces/profile';
import { Toast } from 'src/app/shared/interfaces/toast';
import { AccountInfoService } from 'src/app/shared/services/account-info.service';
import { LoginService } from 'src/app/shared/services/login.service';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { ProfileStructure } from 'src/app/shared/interfaces/profile-structure';
import { CheckConnectionService } from 'src/app/shared/services/check-connection.service';

import { MainStructure } from '../../../shared/interfaces/main-structure';
import { Submenu } from '../../../shared/interfaces/submenu';
import { HomeService } from '../../../shared/services/home.service';
import { Theme } from 'src/assets/theme/theme';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { PinService } from 'src/app/profile/shared/pin.service';
import { PlansService } from 'src/app/shared/services/plans.service';
import { AccountService } from 'src/app/shared/services/account.service';
import { PlanAccessControlService } from 'src/app/shared/services/plan-access-control.service';
import { CheckDeviceService } from 'src/app/shared/services/check-device.service';
import { environment, idMenuNSports } from 'src/environments/environment';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  public profile: Profile;
  public intervalPopupLogged: any;
  public isLogged: boolean;
  public isSelected: boolean;
  public isWatchScreen: boolean;
  public loadImage: boolean;
  public showPopupLogged: boolean;
  public isProfileSelectionScreen: boolean;
  public isMobile: boolean;
  public currentRoute: string;
  public categories: Submenu[];
  public profiles: Profile[];
  public profileStructure: ProfileStructure;
  public toastData: Toast = {};
  public hasLiveChannels: boolean = false;
  public isAmericanet: boolean = false;
  public connectionState: number = 0;
  public firstConnection: boolean = true;
  public showToastCheck: boolean = false;
  public currentPage: string = '';
  public isVoucher: boolean = false;
  public selectProfileScreen: boolean = false;
  public isRentScreen: boolean = false;
  public showPinModal: boolean = false;
  public selectedProfile: Profile = {};
  public verifyPinSuccess?: boolean = undefined;
  public verifyEmailSuccess?: boolean = undefined;
  public profileToEnter: Profile = {};
  public environment = environment;
  public toastPaymentForecast: string = '';
  public toastCupomReg: boolean = false;

  public firstTime: boolean = true;

  public toastOptions: any = {};

  public checkMobile: boolean = false;

  public isDevelopmentAmbient: boolean = false;

  public isUnloggedSession: boolean = false;

  @HostListener('window: resize', ['$event'])
  public onResize() {
    this.updateScreenWidth();
  }

  @ViewChild('toastSuccess') toastSuccess?: ToastSuccessComponent;

  splash = new BehaviorSubject<boolean>(false);

  constructor(
    private accountInfoService: AccountInfoService,
    private homeService: HomeService,
    public loginService: LoginService,
    public profileService: ProfileService,
    private router: Router,
    private checkConnectionService: CheckConnectionService,
    private cd: ChangeDetectorRef,
    private pinService: PinService,
    public theme: Theme,
    private plansService: PlansService,
    private accountService: AccountService,
    private planAccessControlService: PlanAccessControlService,
    private checkDevice: CheckDeviceService,
    private checkDeviceService: CheckDeviceService,
    private splashService: SplashService
  ) {
    if (environment.app) this.splash = this.splashService.state;
    this.checkMobile = this.checkDevice.isMobile();
    this.isSelected = false;
    this.profile = {};
    this.profiles = [];
    this.profileStructure = {};
    this.isLogged = false;
    this.isMobile = false;
    this.categories = [];
    this.currentRoute = '';
    this.isWatchScreen = false;
    this.isProfileSelectionScreen = false;
    this.loadImage = false;
    this.showPopupLogged = false;

    this.toastOptions = {
      toastMessage: '',
      useUndoButton: false,
      display: false
    };

    if (!this.loginService.token) this.loginService.isUnloggedSession = true;
  }

  ngOnInit(): void {
    if (!environment.production && window.location.host === 'localhost:4200')
      this.isDevelopmentAmbient = true;

    this.getUser();
    this.getCurrentPage();
    this.updateScreenWidth();
    this.currentPage = this.getCurrentPage();
    this.verifyIfIsLogged();
    this.loginService.loadToken();
    this.getMainInfo(Number(this.profileService.selectedProfile));

    this.checkConnectionService
      .getConnectionState()
      .subscribe((value: number) => {
        this.connectionState = value;
        this.cd.detectChanges();
      });
    this.getAccountSubscribes();
    this.handleRouteUpdate();
    this.verifyIfIsSelected();
  }

  public onProfileToEnter(profile: Profile): void {
    this.profileToEnter = profile;
    this.showPinModal = true;
  }

  public setScreenRent(newState: boolean): void {
    this.isRentScreen = newState;
  }

  public updateScreenWidth(): void {
    this.isMobile = this.checkDeviceService.isMobile();
  }

  public handleRouteUpdate(): void {
    this.checkRoutes();
    this.router.events.subscribe((route) => {
      if (route instanceof NavigationEnd) {
        this.checkRoutes();

        this.currentRoute = route.url;

        if (this.currentPage.includes('home') && this.firstTime) {
          this.getMainInfo(Number(this.profileService.selectedProfile));
          this.firstTime = false;
        }
      }
    });
  }

  public verifyPin(_pin: string): void {
    this.verifyPinSuccess = undefined;
    this.pinService
      .verifyPin(this.profileToEnter.id_perfis!, _pin)
      .subscribe((res) => {
        this.verifyPinSuccess = res.success;
        if (this.verifyPinSuccess) {
          this.showPinModal = false;
          this.enterProfile(
            this.profileToEnter.id_perfis,
            this.profileToEnter.age_bracket
          );
        }
      });
  }

  public enterProfile(
    id_perfil: number | undefined,
    age_bracket: string | undefined | null
  ): void {
    const notify = localStorage.getItem('directvgo-notify');
    if (!age_bracket) {
      if (notify == 'not-notify-child-profile')
        localStorage.setItem('directvgo-notify', 'notify');
    } else if (age_bracket) {
      if (notify != 'not-notify')
        localStorage.setItem('directvgo-notify', 'not-notify-child-profile');
    }

    this.profileService.selectProfile(id_perfil);
    this.router.navigate(['/home'], { replaceUrl: true }).then(() => {
      window.location.reload();
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

  public checkRoutes(): void {
    // this.selectProfileScreen = this.router.url.includes('/profile/select');

    if (this.router.url.split('/')[1] === 'profile') {
      this.selectProfileScreen = true;
    } else {
      this.selectProfileScreen = false;
    }

    this.currentPage = this.getCurrentPage();
    this.verifyIfIsSelected();
    this.verifyIfIsLogged();
    this.getAccountInfo();

    if (
      this.router.url.includes('/profile') ||
      this.router.url.includes('/login')
    ) {
      this.connectionState = 0;
      return;
    } else if (this.router.url.includes('/watch')) {
      this.isWatchScreen = true;
      this.isProfileSelectionScreen = false;
    } else {
      this.isProfileSelectionScreen = this.isWatchScreen = false;
    }

    this.checkConnectionService.checkConnection();
  }

  public verifyIfIsSelected(): void {
    this.isSelected = this.profileService.loadProfile();
  }

  public verifyIfIsLogged() {
    if (this.loginService.token) {
      this.isLogged = true;
    } else {
      this.showToastCheck = false;
      this.isLogged = false;
    }
  }

  public getUser(): void {
    this.profileService.getUserProfileList().subscribe(
      (profiles) => {
        if (profiles.success && profiles.success.data) {
          this.profileService.setProfileList(profiles);

          this.profileStructure = profiles.success;
          this.profiles = profiles.success.data;
          this.profile = this.getSelectedUser(profiles.success.data);
          this.hasLiveChannels = this.profile.live_content!;
          this.profileService.profileSelected = this.profile;
        }
      },
      (err) => {},
      () => {
        this.profileService.profilesObservable.subscribe(
          (subscribeProfiles) => {
            this.profiles = subscribeProfiles.success?.data!;
          }
        );
      }
    );
  }

  public getSelectedUser(profileList: Profile[]): Profile {
    let _profile = profileList.find(
      (profile) =>
        profile.id_perfis === Number(this.profileService.selectedProfile)
    );
    if (_profile) {
      this.isSelected = true;
      return _profile;
    }
    this.isSelected = false;
    return {};
  }

  /**
   * Subject que armazena a função que será executada 'toastSubscription' caso o usuário
   * não clique em "Desfazer" no Toast.
   */
  public toastSubscriptionGroup: Subject<void> = new Subject();

  /**
   * Variável utilizada para guardar a subscription
   * que vem do componente principal, ou seja, a função que será
   * chamada caso o botão "Desfazer" não seja pressionado.
   * Uso necessário para não guardar estado no "this.subject" principal.
   */
  public toastSubscription?: Subscription;

  public showToast(message: string, useUndoButton?: boolean): Subject<void> {
    localStorage.removeItem('undo_button_pressed');
    this.toastOptions.toastMessage = message;
    this.toastOptions.useUndoButton = useUndoButton;
    this.toastSuccess?.show();

    return this.toastSubscriptionGroup;
  }

  /**
   * Assina a função que será executada no Toast caso o usuário não clique em "Desfazer" a ação.
   * No formato de Subscription também é possível limpar caso o usuário clique em "Desfazer"
   * @param toastSubscription
   */
  public assignToastFunction(toastSubscription: Subscription) {
    this.toastSubscription = toastSubscription;
  }

  /**
   * Função que executa o Subject que contém função 'toastSubscription' depois de o usuário
   * não clicar em "Desfazer".
   */
  public executeToastFunction(): void {
    this.toastSubscriptionGroup.next();
  }

  /**
   * Função utilizada para limpar a subscription específica
   * da função que foi "Desfeita" pelo usuário no Toast.
   */
  public clearToastFunction(): void {
    this.toastSubscription?.unsubscribe();
    localStorage.setItem('undo_button_pressed', 'true');
  }

  public generateToast(type: string): void {
    if (type === 'voucher7d') {
      if (localStorage.getItem('toastVoucher7D')) return;

      this.toastData.toastTime = '7D';

      this.showToastCheck = true;
    }
    if (type === 'voucher15d') {
      if (localStorage.getItem('toastVoucher15D')) return;

      this.toastData.toastTime = '15D';

      this.showToastCheck = true;
    }

    if (type === 'voucher30d') {
      if (localStorage.getItem('toastVoucher30D')) return;

      this.toastData.toastTime = '30D';

      this.showToastCheck = true;
    }
  }

  private getAccountInfo() {
    if (this.isLogged && this.isSelected) {
      this.accountInfoService.AccountInfo().subscribe((data) => {
        this.isVoucher = false;

        if (data.success.data.subscription_type === 'adyen') return;

        if (data.success?.data?.subscription_type === 'voucher')
          this.isVoucher = true;

        let toaster = data.success.data.toaster;
        this.toastData.toastTitle = data.success?.data?.toastTitle;
        this.toastData.toastDesc = data.success?.data?.toastDesc;
        this.toastData.toastClass = data.success?.data?.toastClass;
        this.toastPaymentForecast = data.success?.data?.payment_forecast;

        if(data.success.data?.subscription_rule == 'cupom'){
          if(this.toastPaymentForecast != '') {
            this.toastCupomReg = true;
          }
        }

        if (toaster) this.generateToast(toaster);
      });
    }
  }

  public getProfilesImage(profileList: Profile[]): void {
    profileList.map((profile) => {
      profile.foto = this.buildUrlImage('perfil', profile.foto);
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
    return '';
  }

  public getMainInfo(idPerfil: number): void {
    this.homeService.getMainList(idPerfil).subscribe((data: MainStructure) => {
      this.isAmericanet = data.isAmericanet!;

      this.getAccountSubscribes();

      this.planAccessControlService.hasLiveChannels = this.hasLiveChannels;

      data.menu?.forEach((menu) => {
        if (menu.submenu)
          if (menu.submenu.length > 0)
            this.categories = menu.submenu ? menu.submenu : [];
      });

      if (this.theme.client === 'multilaser') {
        const newCategories = this.categories.filter((category: Submenu) => {
          return category.id !== idMenuNSports;
        });

        this.categories = newCategories;
      }
    });
  }

  public getCurrentPage(): string {
    if (this.router.url.split('/')[1].includes('login')) this.isVoucher = false;
    return this.router.url.split('/')[1];
  }

  public getCurrentPageFullPath(): string {
    return this.router.url;
  }

  public getAccountSubscribes(): void {
    this.plansService.getPlans().subscribe((_plans) => {
      this.accountService.getAccountSubscribes().subscribe((_subscribes) => {
        if (this.theme.client === 'watch') {
          this.planAccessControlService.hasParamount =
            _subscribes.success?.marketPlace?.hasParamount || false;

          this.planAccessControlService.hasHBO =
            _subscribes.success?.marketPlace?.hbo || false;

          this.planAccessControlService.hasStingrayMusic =
            _subscribes.success?.marketPlace?.stingraymusic || false;

          this.planAccessControlService.hasDirectvGO =
            _subscribes.success?.marketPlace?.directv_go || false;
        } else {
          let _planDetails = _subscribes.success?.data?.tickets?.find(
            (_subscribe) => _subscribe.plan_type == 'multilaser'
          );

          let _planBenefits = _plans.find(
            (_plan) => _plan.planId == _planDetails?.plano_id
          )?.planBenefits;

          this.planAccessControlService.hasParamount =
            _planBenefits?.paramount || false;

          this.planAccessControlService.hasHBO = _planBenefits?.hboMax || false;

          this.planAccessControlService.hasStingrayMusic =
            _planBenefits?.stingrayChannels || false;

          this.planAccessControlService.hasDirectvGO =
            _planBenefits?.directTvGo || false;
        }

        this.planAccessControlService.hasUolBanca =
          _subscribes.success?.marketPlace?.uolbanca || false;

        this.planAccessControlService.hasNSports =
          _subscribes.success?.marketPlace?.nsports || false;
      });
    });
  }

  public goToPlans(): void {
    if (this.theme.client === 'watch')
      window.open('https://watchbr.com.br/assinante/');
    else this.router.navigateByUrl('planos/' + this.theme.clientRoute);
  }
}
