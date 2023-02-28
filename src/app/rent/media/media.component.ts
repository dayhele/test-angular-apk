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
import { Movie } from 'src/app/shared/interfaces/movie';
import { BuildUrlImageService } from 'src/app/shared/services/build-url-image.service';
import { DetailsService } from 'src/app/shared/services/details.service';
import { HomeService } from 'src/app/shared/services/home.service';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { RentService } from 'src/app/shared/services/rent.service';
import { environment } from 'src/environments/environment';

declare let AdyenCheckout: any;

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {
  public error: Error;
  public inputNumberError: Error;
  public inputCardholderError: Error;
  public inputMonthError: Error;
  public inputYearError: Error;
  public inputCvvError: Error;
  public inputInstallmentsError: Error;
  public card: CreditCard;

  private price: number;
  public itemId: number;
  public type: string = '';
  private clientKey: string;
  private shopperReference: string;
  public coupom: string;
  public coupomError: string;

  public mediaDetails: Movie;
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

    this.mediaDetails = {};
    this.mediaLoaded = false;

    this.adyenReady = false;
    this.completedPurchase = false;

    this.main = {};
    this.cdnList = {};
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.itemId = Number(params.get('id'));
      this.type = params.get('type')!;

      let idPerfil = parseInt(this.profileService.selectedProfile);

      if (idPerfil) this.getMainInfo(idPerfil);
    });
  }

  public getMainInfo(idPerfil: number): void {
    this.homeService.getMainList(idPerfil).subscribe((data: MainStructure) => {
      this.main = data;

      this.cdnList = data.cdnlist;

      this.getRentData(idPerfil);
    });
  }

  private getRentData(idPerfil: number): void {
    this.detailsService
      .getDetails(idPerfil.toString(), this.itemId, 'filme')
      .subscribe((data) => {
        this.mediaDetails = {
          ...data,
          price: data?.price?.replace('.', ','),
          finalPrice: data?.finalPrice?.replace('.', ','),
          fullPrice: data?.fullPrice?.replace('.', ',')
        };
        this.mediaLoaded = true;

        if (this.mediaDetails.finalPrice === null)
          this.route.navigateByUrl(`/details/${this.itemId}/filme`);

        this.mediaDetails.imageUrl = this.buildUrlImage(
          this.mediaDetails.cdn,
          this.mediaDetails.cover
        );

        this.startCheckout();
      });
  }

  public checkCoupom(): void {
    this.rentService
      .validateCoupom({ item_id: this.itemId, cupom: this.coupom })
      .subscribe((data) => {
        if (!data.success) this.coupomError = data.message!;
        else {
          this.mediaDetails.price = data.price;
          this.mediaDetails.finalPrice = data.price;
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
      item_id: this.itemId,
      cupom: this.coupom
    };

    this.paymentService
      .getCheckoutAdyen(true, checkoutAdyen)
      .subscribe((data) => {
        if (!data.HasError) this.createSession(data.Result!);

        this.clientKey = data.Result?.clientKey!;
        this.shopperReference = data.Result?.shopperReference!;
      });
  }

  private async createSession(sessionResponse: SessionAdyen): Promise<void> {
    let sessionData: SessionAdyen = {
      shopperReference: sessionResponse.shopperReference,
      shopperEmail: sessionResponse.shopperEmail,
      reference: sessionResponse.reference,
      type: 'subscription',
      price: sessionResponse.valor
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
