import { Theme } from 'src/assets/theme/theme';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterProfileSms } from 'src/app/shared/interfaces/register-profile-sms';
import { AtivacaoSmsService } from 'src/app/shared/services/ativacao-sms.service';
import { ActivateAccountComponent } from '../activate-account.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component implements OnInit {
  @Output() changeStepEmitter: EventEmitter<number> =
    new EventEmitter<number>();

  public hasError: boolean = false;
  public profile: RegisterProfileSms = {};
  public smsActivateData: any = {};
  public loadingScreen: boolean = true;
  public errorMessage: string = '';
  public environment: any;

  constructor(
    public theme: Theme,
    private ativacaoSmsService: AtivacaoSmsService,
    private router: Router
  ) {
    this.smsActivateData =
      JSON.parse(sessionStorage.getItem('activate_data')!) || '';

    if (this.theme.client !== 'watch') {
      this.goTo('/login');
    }
    this.environment = environment;
  }

  ngOnInit(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  public registerProfileSms(): void {
    this.profile.call = 'api';
    this.profile.code = this.smsActivateData.code;
    this.ativacaoSmsService.registerProfileSms(this.profile).subscribe(
      (data: any) => {
        if (!data.HasError) {
          this.changeStepEmitter.emit(3);
        }
      },
      (err) => {
        this.hasError = true;
        this.errorMessage = err.error.ErrorMessage;
      }
    );
  }

  public goTo(path: string): void {
    this.router.navigateByUrl(path);
  }

  public returnStep(): void {
    this.changeStepEmitter.emit(1);
  }
}
