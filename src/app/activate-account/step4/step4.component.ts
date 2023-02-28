import { Router } from '@angular/router';
import { Theme } from 'src/assets/theme/theme';
import { Component } from '@angular/core';
import { SmsService } from 'src/app/shared/services/sms.service';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.scss']
})
export class Step4Component {
  user: any = {
    sexo: ''
  };
  error: boolean = false;
  errorMessage: string = '';

  constructor(
    public theme: Theme,
    private smsService: SmsService,
    private route: Router,
    private loginService: LoginService
  ) {
    if (this.theme.client !== 'watch') {
      this.route.navigateByUrl('/login');
    }
  }

  public createAccount(): void {
    this.smsService.userFirstAccess(this.user).subscribe(
      () => {
        sessionStorage.removeItem('first_access');
        this.route.navigateByUrl('/home');
      },
      (err) => {
        this.error = true;
        this.errorMessage = err.error.ErrorMessage;
      }
    );
  }

  public cancel(): void {
    this.loginService.logout();
  }
}
