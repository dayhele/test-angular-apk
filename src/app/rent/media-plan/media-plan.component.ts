import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageComponent } from 'src/app/core/page/page/page.component';
import {
  PaymentResultResponse,
  SessionAdyen,
  SessionAdyenResponse
} from 'src/app/shared/interfaces/adyen';
import { Cdnlist } from 'src/app/shared/interfaces/cdnlist';
import { CreditCard } from 'src/app/shared/interfaces/credit-card';
import { Error } from 'src/app/shared/interfaces/error';
import { MainStructure } from 'src/app/shared/interfaces/main-structure';
import { MediaPlan, MediaPlanDetails } from 'src/app/shared/interfaces/plan';
import { BuildUrlImageService } from 'src/app/shared/services/build-url-image.service';
import { DetailsService } from 'src/app/shared/services/details.service';
import { HomeService } from 'src/app/shared/services/home.service';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { RentService } from 'src/app/shared/services/rent.service';
import { environment } from 'src/environments/environment';

declare let AdyenCheckout: any;

@Component({
  selector: 'app-media-plan',
  templateUrl: './media-plan.component.html',
  styleUrls: ['./media-plan.component.scss']
})
export class MediaPlanComponent implements OnInit {
  public hasError: boolean = false;
  public messageError: string = '';
  public error: Error;
  public inputNumberError: Error;
  public inputCardholderError: Error;
  public inputMonthError: Error;
  public inputYearError: Error;
  public inputCvvError: Error;
  public inputInstallmentsError: Error;
  public resp: any = {};
  public card: CreditCard;

  private price: number;
  public itemId: number;
  public userId: number = 0;
  public type: string = '';
  private clientKey: string;
  private shopperReference: string;
  public coupom: string;
  public coupomError: string;
  public urlImg: String = '';

  public plan: MediaPlan = {};
  public planDetails: MediaPlanDetails = {};
  public mediaLoaded: boolean;

  public adyenReady: boolean;
  public completedPurchase: boolean;

  public main: MainStructure;
  public cdnList: Cdnlist;

  constructor(
    private paymentService: PaymentService,
    private detailsService: DetailsService,
    private rentService: RentService,
    private homeService: HomeService,
    private profileService: ProfileService,
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private route: Router,
    private pageComponent: PageComponent
  ) {
    this.error = {};
    this.card = {};

    this.inputNumberError = {};
    this.inputCardholderError = {};
    this.inputMonthError = {};
    this.inputYearError = {};
    this.inputCvvError = {};
    this.inputInstallmentsError = {};

    this.price = 0;
    this.itemId = 0;
    this.clientKey = '';
    this.shopperReference = '';
    this.coupom = '';
    this.coupomError = '';

    this.mediaLoaded = false;
    this.adyenReady = false;
    this.completedPurchase = false;

    this.main = {};
    this.cdnList = {};
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.itemId = Number(params.get('id'));
      this.userId = parseInt(this.profileService.userId);
      let idPerfil = parseInt(this.profileService.selectedProfile);

      if (idPerfil) this.getMainInfo(idPerfil);
    });
  }

  public getMainInfo(idPerfil: number): void {
    this.homeService.getMainList(idPerfil).subscribe((data: MainStructure) => {
      this.main = data;
      this.cdnList = data.cdnlist;

      this.getRentData();
    });
  }

  private getRentData(): void {
    this.detailsService.getDetailsPlan(this.itemId).subscribe(
      (data) => {
        this.plan = { ...data };
        this.planDetails = { ...data.Result };
        this.resp = this.plan;

        this.hasError = data.HasError!;
        this.messageError = data.ErrorMessage!;

        this.urlImg =
          'https://watchbr-resources.s3.amazonaws.com/marketplace/' +
          this.planDetails.over!;

        //this.mediaLoaded = true;
        this.startCheckout();
      },
      (error) => {
        this.mediaLoaded = true;
        this.resp = error.error;

        this.hasError = error.error.HasError!;
        this.messageError = error.error.ErrorMessage!;
      }
    );
  }

  public checkCoupom(): void {
    this.rentService
      .validateCoupom({ item_id: this.itemId, cupom: this.coupom })
      .subscribe((data) => {
        if (!data.success) this.coupomError = data.message!;
        else {
          // this.mediaDetails.price = data.price;
          // this.mediaDetails.finalPrice = data.price;
        }
      });
  }

  public buildUrlImage(
    cdnId: number | undefined,
    imageName: string | undefined
  ): string {
    const url: Cdnlist | undefined = this.main?.cdnlist?.find(
      (cdn: any) => cdnId === cdn.id
    );

    switch (cdnId) {
      case 1:
        return url!.value!.replace('{image}/ks/{ks}', imageName!);

      default:
        return url!.value!.replace('{image}', imageName!);
    }
  }

  private async startCheckout(): Promise<void> {
    let checkoutAdyen = {
      userid: this.userId,
      idplano: this.itemId,
      frequency: 'monthly',
      voucher: '',
      price: 0,
      flow: 'marketplace_pay'
    };

    this.paymentService.getCheckoutAdyenPlan(checkoutAdyen).subscribe(
      (data) => {
        if (!data.HasError) this.createSession(data.Result!);

        this.clientKey = data.Result?.clientKey!;
        this.shopperReference = data.Result?.shopperReference!;
        this.mediaLoaded = true;
      },
      (error) => {
        this.resp = error.error;
        this.hasError = error.error.HasError!;
        this.messageError = error.error.ErrorMessage!;
        this.mediaLoaded = true;
      }
    );
  }

  private async createSession(sessionResponse: SessionAdyen): Promise<void> {
    let sessionData: SessionAdyen = {
      shopperReference: sessionResponse.shopperReference,
      shopperEmail: sessionResponse.shopperEmail,
      reference: sessionResponse.reference,
      type: 'subscription',
      price: sessionResponse.price
    };

    this.paymentService.getSessionAdyen(sessionData).subscribe((data) => {
      this.createAdyenUI(data);
    });
  }

  private async createAdyenUI(data: SessionAdyenResponse): Promise<void> {
    const checkout = await this.createAdyenCheckoutUI(data);
    checkout.create('dropin').mount(document.getElementById('payment'));
  }

  private createAdyenCheckoutUI(session: SessionAdyenResponse): any {
    this.adyenReady = true;

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
        this.paymentFinalize();
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

  private paymentFinalize(): void {
    this.paymentService
      .mediaFinalize(this.itemId, this.coupom)
      .subscribe(() => {
        this.completedPurchase = true;
        this.cd.detectChanges();
      });
  }
}
