import { TokenName } from './../../environments/environment.prod';
import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Theme } from 'src/assets/theme/theme';
import { Error } from '../shared/interfaces/error';
import { LoginForm } from '../shared/interfaces/login-form';
import { LoginService } from '../shared/services/login.service';
import { PlansService } from '../shared/services/plans.service';
import { AccountService } from '../shared/services/account.service';
import { PlanAccessControlService } from '../shared/services/plan-access-control.service';
import { CheckDeviceService } from '../shared/services/check-device.service';
import { ProfileService } from '../shared/services/profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user: LoginForm = {
    email: '',
    password: ''
  };

  environment = environment;

  public error: Error = {};
  public isLoading: boolean = false;
  public bgImage: string = '';
  public sessionError: boolean = false;
  public sessionErrorMessage: string = '';

  constructor(
    private loginService: LoginService,
    private route: Router,
    public theme: Theme,
    private plansService: PlansService,
    private accountService: AccountService,
    private planAccessControlService: PlanAccessControlService,
    public checkDevice: CheckDeviceService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    if(this.loginService.getSessionIsExpired()){
      this.loginService.setSessionIsExpired(false);
      this.sessionError = true;
      this.sessionErrorMessage = 'Sua sessão expirou! realize o login novamente.'
    }
    if (this.checkDevice.isMobile() && this.theme.client === 'watch') {
      this.bgImage = this.theme.login.loginBgMobileUrl;
    } else this.bgImage = this.theme.login.loginBgUrl;
  }

  public onSubmit(): void {
    this.isLoading = true;
    event?.preventDefault();

    if (!this.isAllOk()) {
      this.isLoading = false;
      return;
    }

    this.loginService.authenticateUser(this.user).subscribe(
      (response) => {
        this.isLoading = false;
        if (response.success?.token) {
          this.loginService.isUnloggedSession = false;
          sessionStorage.setItem('isUnloggedSession', 'false');

          this.error.hasError = false;
          sessionStorage.removeItem(TokenName + '-unlogged');
          this.loginService.token = response.success.token;
          localStorage.setItem('email', this.user.email!);
          localStorage.setItem(
            'deviceUuid',
            this.profileService.generateDeviceUuid(6)
          );
          if (response.success?.first_access) {
            this.route.navigateByUrl(
              '/activate-account-sms/first-registration'
            );
            sessionStorage.setItem('first_access', 'true');
          } else {
            this.getAccountSubscribes();
            this.route.navigateByUrl('/profile/select');
          }
        } else {
          this.error.hasError = true;
          this.error.message = response.error;
        }
      },
      (err) => {
        this.isLoading = false;
        this.error.hasError = true;
        this.error.message = err.error.error;
      }
    );
  }

  public isAllOk(): boolean {
    return this.user.email != '' && this.user.password != '';
  }

  public redirectToWatch(): void {
    window.open('https://watchbr.com.br/assinante/');
  }

  public getAccountSubscribes(): void {
    this.plansService.getPlans().subscribe((_plans) => {
      this.accountService.getAccountSubscribes().subscribe((_subscribes) => {
        if (this.theme.client === 'watch') {
          this.planAccessControlService.hasParamount =
            _subscribes.success?.marketPlace?.hasParamount || false;

          this.planAccessControlService.hasHBO =
            _subscribes.success?.marketPlace?.hbo || false;
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
        }

        this.planAccessControlService.hasStingrayMusic =
          _subscribes.success?.marketPlace?.stingraymusic || false;

        this.planAccessControlService.hasUolBanca =
          _subscribes.success?.marketPlace?.uolbanca || false;

        this.planAccessControlService.hasDirectvGO =
          _subscribes.success?.marketPlace?.directv_go || false;
      });
    });
  }

  public goToFaqs(): void {
    if (this.theme.client == 'watch')
      window.open('https://watchbr.com.br/faq/');

    if (this.theme.client == 'multilaser') this.route.navigateByUrl('/faq');
  }
}
