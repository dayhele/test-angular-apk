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
export class OnlyRealLoginGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> | boolean | UrlTree {
    if (sessionStorage.getItem('isUnloggedSession') === 'false') return true;

    this.loginService.clearUnloggedDetails();
    return this.router.parseUrl('welcome');
  }
}
