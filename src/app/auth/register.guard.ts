import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): true | UrlTree {
    return this.validate();
  }

  private validate() {
    const haveStorage = sessionStorage.getItem('selected_plan');
    const isVoucher = sessionStorage.getItem('voucher');
    const isCupom = sessionStorage.getItem('cupom');
    if (haveStorage || isVoucher || isCupom) return true;
    return this.router.parseUrl('/planos');
  }
}
