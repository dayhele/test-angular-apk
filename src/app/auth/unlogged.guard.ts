import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../shared/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class UnloggedGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): true | UrlTree {
    return this.checkLogin(route);
  }

  private checkLogin(route: ActivatedRouteSnapshot) {
    if (this.loginService.isUnloggedSession) return true;
    if (this.loginService.token) return this.router.parseUrl('/home');
    return true;
  }
}
