import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { LoginService } from '../shared/services/login.service';
import { ProfileService } from '../shared/services/profile.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {
  constructor(
    private profileService: ProfileService,
    private router: Router,
    private loginService: LoginService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    return this.checkProfile();
  }

  private checkProfile() {
    let _item = sessionStorage.getItem('first_access');

    if (this.profileService.selectedProfile) return true;

    if (
      _item &&
      this.router.url === '/activate-account-sms/first-registration'
    ) {
      this.loginService.logout();
      return false;
    }

    return this.router.parseUrl('/profile/select');
  }
}
