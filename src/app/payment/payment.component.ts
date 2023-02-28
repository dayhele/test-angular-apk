import { RegisterForm } from 'src/app/shared/interfaces/register-form';
import { Component, NgZone, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PlansService } from 'src/app/shared/services/plans.service';
import { environment } from 'src/environments/environment';

import {
  PaymentResultResponse,
  SessionAdyen,
  SessionAdyenResponse
} from 'src/app/shared/interfaces/adyen';
import { CreditCard } from 'src/app/shared/interfaces/credit-card';
import { Error } from 'src/app/shared/interfaces/error';
import { Plan } from 'src/app/shared/interfaces/plan';
import { LoginService } from 'src/app/shared/services/login.service';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { PageComponent } from '../core/page/page/page.component';
import { Theme } from 'src/assets/theme/theme';

declare let AdyenCheckout: any;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  public environment: any;
  public isLoading: boolean = true;
  public plan: Plan = {};

  public error: Error = {};
  public inputNumberError: Error = {};
  public inputCardholderError: Error = {};
  public inputMonthError: Error = {};
  public inputYearError: Error = {};
  public inputCvvError: Error = {};
  public inputInstallmentsError: Error = {};
  public isUpdatingData: boolean = false;
  public isVoucher: boolean = false;

  public cupom: string = '';
  public planId: number = 0;

  public showSucessModal: boolean = false;

  private price: number = 0;
  private userId: number = 0;
  private clientKey: string = '';
  private shopperReference: string = '';
  private voucher: string = '';

  constructor(
    private route: Router,
    private paymentService: PaymentService,
    private actRoute: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private router: Router,
    private zone: NgZone,
    private pageComponent: PageComponent,
    public theme: Theme
  ) {}

  ngOnInit(): void {
    localStorage.removeItem('adyen-checkout__session');

    this.actRoute.paramMap.subscribe((params) => {
      const route = params.get('atualizar');

      if (route === 'atualizar') this.isUpdatingData = true;
      if (route === 'voucher') this.isVoucher = true;

      this.userId =
        Number(localStorage.getItem('user_id')) ||
        Number(sessionStorage.getItem('register_user_id'));
      this.planId =
        Number(params.get('planId')) ||
        Number(sessionStorage.getItem('selected_planId'));

      this.startCheckout();
    });
  }

  private async startCheckout(): Promise<void> {
    let checkoutAdyen = {
      userid: this.userId,
      idplano: this.planId,
      frequency: 'monthly',
      voucher: this.voucher === '' ? this.cupom : this.voucher,
      flow: 'payment'
    };

    if (this.isUpdatingData) checkoutAdyen.flow = 'update_data';
    if (this.isVoucher) checkoutAdyen.flow = 'voucher';

    this.paymentService.getCheckoutAdyen(false, checkoutAdyen).subscribe({
      next: (data) => {
        this.createSession(data.Result!);

        this.clientKey = data.Result?.clientKey!;
        this.shopperReference = data.Result?.shopperReference!;
      }
    });
  }

  private async createSession(sessionResponse: SessionAdyen): Promise<void> {
    let sessionData: SessionAdyen = {
      shopperReference: sessionResponse.shopperReference,
      shopperEmail: sessionResponse.shopperEmail,
      reference: sessionResponse.reference,
      type: 'subscription',
      price: sessionResponse.price
    };

    this.paymentService.getSessionAdyen(sessionData).subscribe({
      next: (data) => {
        this.createAdyenUI(data);
      },
      complete: () => (this.isLoading = false)
    });
  }

  private async createAdyenUI(data: SessionAdyenResponse): Promise<void> {
    const checkout = await this.createAdyenCheckoutUI(data);
    checkout.create('dropin').mount(document.getElementById('payment'));
  }

  private createAdyenCheckoutUI(session: SessionAdyenResponse): any {
    return new AdyenCheckout({
      clientKey: this.clientKey,
      locale: 'pt_BR',
      environment: environment.adyen,
      session: session,
      showPayButton: true,
      openFirstStoredPaymentMethod: true,
      showStoredPaymentMethods: true,
      shopperReference: this.shopperReference,
      paymentMethodsConfiguration: {
        card: {
          enableStoreDetails: false,
          hasHolderName: true,
          holderNameRequired: true,
          name: 'Cartão de crédito ou débito',
          amount: {
            value: this.price,
            currency: 'BRL'
          },
          styles: {
            base: {
              color: '#000000'
            }
          }
        }
      },
      onPaymentCompleted: (result: PaymentResultResponse) => {
        this.paymentResponse(result);
      }
    });
  }

  private paymentResponse(response: PaymentResultResponse): void {
    switch (response.resultCode) {
      case 'Authorised':
        this.paymentAdyen();
        break;
      case 'Pending':
      case 'Received':
        /* Tela de pagamento pendente */
        break;
      case 'Refused':
        /* Tela de erro */
        break;
      default:
        /* Tela de genérica de erro */
        break;
    }
  }

  public goToHome(): void {
    this.zone.run(() => {
      this.router.navigateByUrl('/home');
    });
  }

  private paymentAdyen(): void {
    this.paymentService
      .getPaymentAdyenReturn(false, { userid: this.userId })
      .subscribe(() => {
        const element = document.getElementById('payment');
        element?.remove();

        this.showSucessModal = true;
        this.cd.detectChanges();

        this.zone.run(() => {
          if (this.isUpdatingData) {
            this.pageComponent.showToast('Cartão alterado com sucesso');
            this.route.navigateByUrl('/home');
            return;
          }

          if (this.isVoucher) {
            this.pageComponent.showToast('Plano alterado com sucesso');
            this.route.navigateByUrl('/home');
            return;
          }

          this.route.navigateByUrl('/login/success');
        });
      });
  }
}
