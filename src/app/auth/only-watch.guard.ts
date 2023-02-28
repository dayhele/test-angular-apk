import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Theme } from 'src/assets/theme/theme';

@Injectable({
  providedIn: 'root'
})
export class OnlyWatchGuard implements CanActivate {

  constructor(private theme: Theme, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkTheme();
  }

  private checkTheme() {
    if (this.theme.client === 'watch') return true;
    return this.router.parseUrl('home');
  }
}
