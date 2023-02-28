import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SmsService } from 'src/app/shared/services/sms.service';

import { Theme } from 'src/assets/theme/theme';
import { Error } from '../../shared/interfaces/error';
import { CodeService } from '../../shared/services/code.service';

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.scss']
})
export class SmsComponent implements OnInit {
  public environment: any;
  public error: Error;
  public waitingForCodeValidation: boolean;
  public cupom: string;
  public cupomDisabled: boolean;
  public voucherDisabled: boolean;
  public voucher: string;
  public sms: string;
  public voucherError: Error;
  public cupomError: Error;
  public smsError: Error;
  public smsDisabled: boolean;
  public smsCode: string = '';
  public successModal: boolean;


  constructor(
    private route: Router,
    private codeService: CodeService,
    private smsService: SmsService,
    public theme: Theme
  ) {
    this.successModal = false;
    this.error = {};
    this.voucher = '';
    this.sms = '';
    this.cupom = '';
    this.waitingForCodeValidation = false;
    this.cupomDisabled = false;
    this.smsDisabled = false;
    this.voucherDisabled = false;
    this.voucherError = {};
    this.cupomError = {};
    this.smsError = {};
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('cupomByUrl')?.toString() == "true"){
      this.route.navigateByUrl('login/cadastro');
    }
    sessionStorage.removeItem('selected_planId');
    sessionStorage.removeItem('voucher');
  }

  public validate(type: string): void {
    if (this.theme.client === 'multilaser') {
      if (this.isAllOk()) {
        this.waitingForCodeValidation = true;

        if (type === 'voucher') this.voucher = this.voucher.replace(/\s/g, '');
        if (type === 'cupom') this.cupom = this.cupom.replace(/\s/g, '');

        this.codeService
          .validate(type === 'voucher' ? this.voucher : this.cupom, type)
          .subscribe({
            next: (res) => {
              if (res.HasError == false) {
                sessionStorage.setItem(
                  type,
                  type === 'voucher' ? this.voucher : this.cupom
                );
                if (res.Result?.id_plano)
                  sessionStorage.setItem(
                    'id_plano',
                    res.Result.id_plano.toString()
                  );
                this.route.navigateByUrl('login/cadastro');
              }
              this.waitingForCodeValidation = false;
            },
            error: (e) => {
              if (e.error.HasError) {
                type === 'voucher'
                  ? (this.voucherError.hasError = true)
                  : (this.cupomError.hasError = true);
                this.error.message = '';
              }
              this.waitingForCodeValidation = false;
            }
          });
      } else {
        this.waitingForCodeValidation = false;
      }
    } else {
      this.waitingForCodeValidation = true;
    }
  }

  public isAllOk(): boolean {
    if (this.theme.client === 'multilaser') {
      if (this.voucher === '' && this.cupom === '') {
        this.error.hasError = true;
        this.error.message = 'Preencha o código promocional ou o voucher.';
        return false;
      }
    } else {
      if (this.smsCode === '') {
        this.smsError.hasError = true;
        this.smsError.message = 'Preencha o código enviado via sms';
        return false;
      }
    }
    return true;
  }

  public valueChange(type: string, value: string): void {
    type === 'voucher' ? (this.voucher = value) : (this.cupom = value);

    if (this.voucher === '' && this.cupom === '') {
      this.voucherDisabled = false;
      this.cupomDisabled = false;
    }

    if (this.voucher !== '') {
      this.cupomDisabled = true;
    }

    if (this.cupom !== '') {
      this.voucherDisabled = true;
    }
  }

  public verifyCode(): void {
    if (this.isAllOk()) {
      if (this.cupomDisabled) {
        this.validate('voucher');
      } else {
        this.validate('cupom');
      }
    }
  }
  public verifySms(): void {
    this.smsService.validate(this.smsCode, 'api').subscribe((res) => {
      this.successModal = true
      this.route.navigate(['/login/cadastro']);
    },
    (err) => {
      this.smsError.hasError = err.error.HasError;
      this.smsError.message = '';
    }
    );
  }

  public clearError(type?: string): void {
    this.error.hasError = false;
    this.error.message = '';

    if (type === 'voucher') {
      this.voucherError.hasError = false;
      this.voucherError.message = '';
    } else if (type === 'cupom') {
      this.cupomError.hasError = false;
      this.cupomError.message = '';
    }
  }
  public resentSmsCode(): void {
    this.smsService.resendNewCode().subscribe(
      (res) => {

      },
      (err) => {
        this.smsError.hasError = err.error.HasError;
        this.smsError.message = err.error.ErrorMessage;
      }
    );
  }
  public clearSms(smsCode?: string): void {
    this.smsError.hasError = false;
    this.smsError.message = '';

    if (smsCode === '') {
      this.smsError.hasError = false;
      this.smsError.message = '';
    }
  }
}
