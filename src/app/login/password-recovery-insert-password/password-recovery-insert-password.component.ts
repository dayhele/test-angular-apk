import { ChangePasswordResponse } from './../../shared/interfaces/change-password-response';
import { LoginService } from './../../shared/services/login.service';
import { Error } from './../../shared/interfaces/error';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Theme } from 'src/assets/theme/theme';

@Component({
  selector: 'app-password-recovery-insert-password',
  templateUrl: './password-recovery-insert-password.component.html',
  styleUrls: ['./password-recovery-insert-password.component.scss']
})
export class PasswordRecoveryInsertPasswordComponent implements OnInit {
  private token: string;
  public environment: any;
  public passwordFirst: string;
  public passwordSecond: string;
  public error: Error;
  public success: boolean;
  public successMessage: string;

  constructor(
    private loginService: LoginService,
    private activatedRoute: ActivatedRoute, 
    public theme:Theme
  ) {
    this.token = '';
    this.passwordFirst = '';
    this.passwordSecond = '';
    this.error = { hasError: false };
    this.success = false;
    this.successMessage =
      'A sua senha foi alterada com sucesso. Clique em login para acessar a sua conta.';
    this.environment = environment;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.token = params.get('token')!;
    });
  }

  public checkFields(): boolean {
    if (this.passwordFirst === '' || this.passwordSecond === '') {
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

  public onSubmit(): void {
    event?.preventDefault();
    if (!this.checkFields()) {
      this.loginService
        .sendNewPassword(this.token, this.passwordFirst)
        .subscribe(
          (data: ChangePasswordResponse) => {
            if (!data.HasError) {
              if (!data.HasError) this.success = true;
            } else {
              this.error.hasError = true;
              this.error.message = data.ErrorMessage;
            }
          },
          (err) => {
            this.error.hasError = true;
            this.error.message = err.error.ErrorMessage;
          }
        );
    }
  }
}
