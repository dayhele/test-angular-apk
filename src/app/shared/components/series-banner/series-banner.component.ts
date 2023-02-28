import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Movie } from '../../interfaces/movie';
import { PlanAccessControlService } from '../../services/plan-access-control.service';
import { WatchService } from '../../../watch/shared/watch.service';
import { Theme } from 'src/assets/theme/theme';

@Component({
  selector: 'app-series-banner',
  templateUrl: './series-banner.component.html',
  styleUrls: ['./series-banner.component.scss']
})
export class SeriesBannerComponent {
  @Input() backgroundPath: string;
  @Input() data: Movie;
  @Input() title: string;
  @Input() type: string;
  @Input() id?: number;
  @Input() idPerfil: number = 0;
  @Input() favorite: boolean = false;
  @Input() isParamount: boolean = false;

  @Output() hasntParamount: EventEmitter<any> = new EventEmitter();

  public environment: any;
  public isUnloggedSession: boolean = false;

  constructor(
    private watchService: WatchService,
    private route: Router,
    public planAccessControlService: PlanAccessControlService,
    public theme: Theme
  ) {
    this.backgroundPath = '';
    this.data = {};
    this.title = '';
    this.type = '';
    this.environment = environment;

    this.isUnloggedSession =
      sessionStorage.getItem('isUnloggedSession') === 'true';
  }

  public toMinutes(timeSeconds: number): string {
    let time = 0;

    if (timeSeconds) {
      time = Math.floor(timeSeconds / 60);
      return '- ' + time + 'min.';
    }
    return '';
  }

  public watch(): void {
    if (
      this.isParamount &&
      !this.planAccessControlService.hasParamount &&
      !this.data.isParamountFreemium
    ) {
      this.hasntParamount.emit();
      return;
    }

    if (this.data.isNSportsMatch && !this.data.isLiveMatch && !this.data.matchAlreadyHappened) {
      this.openNSportsWaitModal();
      document.body.style.overflowY = "hidden";
      return;
    }

    if (this.type === 'serie') {
      if (this.data.position)
        this.watchService.watch(
          this.id!,
          this.type,
          false,
          this.data.id,
          false,
          this.data.position
        );
      else this.watchService.watch(this.id!, this.type, false, this.data.id);
    } else {
      if (this.data.isLiveMatch) {
        this.watchService.watch(this.id!, this.type, true);
      } else if (this.data.position)
        this.watchService.watch(
          this.id!,
          this.type,
          false,
          0,
          false,
          this.data.position
        );
      else this.watchService.watch(this.id!, this.type);
    }
  }

  private openChoosePaymentModal(): void {
    localStorage.setItem('modal-choose-payment', 'true');
  }

  private openNSportsWaitModal(): void {
    localStorage.setItem('nsports-wait-modal', 'true');
  }

  public rent(): void {
    if (this.data.isNSportsPayment && this.theme.client === 'watch') {
      this.openChoosePaymentModal();
      return;
    }

    this.route.navigate([`/rent/media/${this.id}/${this.type}`]);
  }

  public convertReal(finalPrice: any) {
    return finalPrice.toString().replace('.', ',');
  }

  public goToWatchSubscribe(): void {
    this.route.navigateByUrl('welcome/find');
  }
}
