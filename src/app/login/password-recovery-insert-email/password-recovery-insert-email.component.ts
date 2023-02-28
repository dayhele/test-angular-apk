import { ForgotPasswordResponse } from './../../shared/interfaces/forgot-password-response';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';
import { LoginForm } from './../../shared/interfaces/login-form';
import { Error } from 'src/app/shared/interfaces/error';
import { Component } from '@angular/core';
import { Theme } from 'src/assets/theme/theme';

@Component({
  selector: 'app-password-recovery-insert-email',
  templateUrl: './password-recovery-insert-email.component.html',
  styleUrls: ['./password-recovery-insert-email.component.scss']
})
export class PasswordRecoveryInsertEmailComponent {
  public user: LoginForm;
  public error: Error;
  public successMessage: boolean;

  constructor(private loginService: LoginService, private route: Router, public theme: Theme) {
    this.user = {
      email: ''
    };
    this.error = { hasError: false };
    this.successMessage = false;
  }

  public checkFields(): boolean {
    if (this.user.email == '') {
      this.error.hasError = true;
      this.error.message = 'Preencha o campo "email" corretamente.';
      return true;
    }
    return false;
  }

  public onSubmit(): void {
    event?.preventDefault();
    if (!this.checkFields()) {
      this.submitAttempt();
    }
  }

  public submitAttempt(): void {
    this.loginService.forgotPassword(this.user.email!).subscribe(
      (response) => {
        this.checkResponse(response);
      },
      (err) => {
        this.error.hasError = true;
        this.error.message =
          'Desculpe. Não conseguimos encontrar este email, tente novamente.';
        this.successMessage = false;
      }
    );
  }

  public checkResponse(response: ForgotPasswordResponse): void {
    if (response.HasError) {
      this.error.hasError = true;
      this.error.message =
        'Desculpe. Não conseguimos encontrar este email, tente novamente.';
      this.successMessage = false;
    } else this.successMessage = true;
  }
}
