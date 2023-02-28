import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';

import { LoginService } from '../shared/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): true | UrlTree {
    return this.checkLogin(route);
  }

  private checkLogin(route: ActivatedRouteSnapshot) {
    if (route.queryParams['updatePayment']) return true;
    if (this.loginService.token) return this.router.parseUrl('/home');
    return true;
  }
}
