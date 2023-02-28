import { AfterContentInit, AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ModalOptions } from 'src/app/shared/interfaces/delete-modal-props';
import { Error } from 'src/app/shared/interfaces/error';
import Success from 'src/app/shared/interfaces/success';
import { AtivacaoService } from 'src/app/shared/services/ativacao.service';
import { Theme } from 'src/assets/theme/theme';

@Component({
  selector: 'app-ativacao',
  templateUrl: './ativacao.component.html',
  styleUrls: ['./ativacao.component.scss']
})
export class AtivacaoComponent implements OnInit {
  public code: string;
  public modalOptions: ModalOptions;
  public email: string;
  public error: Error;
  public success: Success;
  public successModal: boolean;

  constructor(
    private ativacaoService: AtivacaoService,
    private router: Router,
    public theme: Theme
  ) {
    this.code = '';
    this.email = '';
    this.successModal = false;
    this.modalOptions = {};
    this.error = {};
    this.success = {};
  }

  ngOnInit(): void {
    this.resetModalOptions();
  }

  public activateAccount(): void {
    this.ativacaoService.activateAccount(this.code).subscribe(
      (res) => {
        if (res.HasError === false) {
          if (res.Result.voucher?.code || res.Result.cupom)
            this.router.navigateByUrl(
              '/activationVoucher?isReactivation=false'
            );
          else this.router.navigateByUrl('pagamento');
        }
      },
      (e) => {
        if (e.error.HasError) {
          this.error.hasError = true;
          this.error.message = e.error.ErrorMessage;
          this.success.success = false;
        }
      }
    );
  }

  public resetModalOptions(): void {
    const newModalOptions: ModalOptions = {
      id_perfil: 0,
      isOpen: false,
      events: {
        confirm: false
      }
    };

    this.modalOptions = newModalOptions;
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

  public redeemCode(): void {
    this.ativacaoService.redeemCode(this.email).subscribe({
      next: (res) => {
        if (res.HasError == false) {
          this.error.hasError = false;
          this.success.success = true;
          this.success.message = res.ErrorMessage;
        }
      },
      error: (e) => {
        if (e.error.HasError) {
          this.error.hasError = true;
          this.success.success = false;
          this.error.message = e.error.ErrorMessage;
        }
      }
    });
  }

  public goToHome(): void {
    this.router.navigateByUrl('/home');
  }

  public receiveEvent(modalOptions: ModalOptions): void {
    if (modalOptions.events?.close) {
      this.resetModalOptions();
    } else {
      this.redeemCode();
      this.resetModalOptions();
    }
  }
}
