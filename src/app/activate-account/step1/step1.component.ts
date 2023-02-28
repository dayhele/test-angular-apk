import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AtivacaoSmsService } from 'src/app/shared/services/ativacao-sms.service';
import { Theme } from 'src/assets/theme/theme';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component {
  @Output() changeStepEmitter: EventEmitter<number> =
    new EventEmitter<number>();

  public smsCode: string = '';
  public activateSmsError: any = {};
  public isLoadingRequest: boolean = false;
  private ticketID: any = {};

  constructor(
    public theme: Theme,
    private ativacaoSmsService: AtivacaoSmsService,
    private router: Router
  ) {
    if (this.theme.client !== 'watch') {
      this.router.navigateByUrl('/login');
    }
  }

  public sendSmsCode(): void {
    delete this.activateSmsError;
    this.isLoadingRequest = true;
    this.ativacaoSmsService
      .activateSMS(this.smsCode)
      .pipe(
        finalize(() => {
          this.isLoadingRequest = false;
        })
      )
      .subscribe({
        next: (data: any) => {
          sessionStorage.setItem('activate_data', JSON.stringify(data.Result));
          this.changeStepEmitter.emit(2);
        },
        error: (err) => {
          this.activateSmsError = err;
          this.ticketID = err.error.Result.id;
        }
      });
  }

  public resendSmsCode(): void {
    delete this.activateSmsError;
    this.isLoadingRequest = true;
    this.ativacaoSmsService
      .reactivateSMS(this.smsCode, this.ticketID)
      .pipe(
        finalize(() => {
          this.isLoadingRequest = false;
        })
      )
      .subscribe({
        next: (data: any) => {
          this.activateSmsError = data;
        },
        error: (err) => {
          this.activateSmsError = err;
        }
      });
  }

  public goTo(path: string): void {
    this.router.navigateByUrl(path);
  }
}
