import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Theme } from 'src/assets/theme/theme';

@Component({
  selector: 'app-activation-voucher',
  templateUrl: './activationVoucher.component.html',
  styleUrls: ['./activationVoucher.component.scss']
})
export class ActivationVoucherComponent implements OnInit {
  public isReactivation: boolean;
  constructor(
    private route: Router,
    private activateRouter: ActivatedRoute,
    public theme: Theme
  ) {
    this.isReactivation = false;
  }

  ngOnInit(): void {
    this.isReactivation =
      this.activateRouter.snapshot.queryParams['isReactivation'];
  }

  confirm() {
    this.route.navigateByUrl('home');
  }
}
