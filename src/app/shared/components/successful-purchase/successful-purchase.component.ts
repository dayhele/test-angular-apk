import { Component, Input, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { WatchService } from '../../../watch/shared/watch.service';

@Component({
  selector: 'app-successful-purchase',
  templateUrl: './successful-purchase.component.html',
  styleUrls: ['./successful-purchase.component.scss']
})
export class SuccessfulPurchaseComponent {
  @Input() public itemId: number;
  @Input() public isPlan?: boolean = false;

  constructor(
    private watchService: WatchService,
    private route: Router,
    private ngZone: NgZone
  ) {
    this.itemId = 0;
  }

  public watchNow(): void {
    this.watchService.watch(this.itemId, 'filme', false);
  }

  public watchLater(): void {
    if (this.isPlan) this.ngZone.run(() => this.route.navigateByUrl('/'));
    else this.ngZone.run(() => this.route.navigateByUrl('/rent'));
  }
}
