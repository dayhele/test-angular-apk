import { ChangePasswordResponse } from './../interfaces/change-password-response';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subject } from 'rxjs';
import { TokenName } from '../../../environments/environment';
import { LoginForm } from '../interfaces/login-form';
import { loginResponse } from '../interfaces/login-response.interface';
import { Http } from './http.service';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly endpoint: string = '/auth';
  private storageToken: Subject<string>;

  public storageTokenObservable: Observable<string>;
  public isUnloggedSession: boolean = false;
  private sessionIsExpired: boolean = false;

  constructor(
    private http: Http,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.storageToken = new Subject<string>();
    this.storageTokenObservable = new Observable<string>();
    this.onInitServices();
  }

  public onInitServices(): void {
    this.storageTokenObservable = this.storageToken.asObservable();
  }

  public authenticateUser(user: LoginForm): Observable<loginResponse> {
    user.origin =
      !environment.production && window.location.host === 'localhost:4200'
        ? localStorage.getItem('theme') || environment.client
        : environment.client;
    return this.http.post('v3/auth', user);
  }

  public forgotPassword(email: string): Observable<any> {
    let httpParams = new HttpParams().append(
      'key',
      'b1aa9facd472bc233f07febdc04cb41cdc255b5a80624d67642990375e138afd'
    );

    return this.http.post(
      'v3/link-esqueci-minha-senha',
      { email, url: 'http://teste.com' },
      httpParams
    );
  }

  public changePassword(
    password: string,
    current_password: string
  ): Observable<ChangePasswordResponse> {
    return this.http.post('v3/change/password', {
      password,
      current_password
    });
  }

  public sendNewPassword(
    token: string,
    password: string
  ): Observable<ChangePasswordResponse> {
    let httpParams = new HttpParams().append(
      'key',
      'b1aa9facd472bc233f07febdc04cb41cdc255b5a80624d67642990375e138afd'
    );

    return this.http.post(
      'v3/reset-esqueci-minha-senha',
      { token, password },
      httpParams
    );
  }

  public loadToken(): void {
    const storage = localStorage.getItem(TokenName);
    if (storage) {
      this.storageToken.next('loaded');
    }
  }

  public set token(token: string) {
    localStorage.setItem(TokenName, token);
    this.storageToken.next('added');
  }

  public get token(): any {
    return localStorage.getItem(TokenName);
  }

  public set tokenUnlogged(token: string) {
    sessionStorage.setItem(TokenName + '-unlogged', token);
    this.storageToken.next('added');
  }

  public get tokenUnlogged(): any {
    return sessionStorage.getItem(TokenName + '-unlogged');
  }

  public logout(): void {
    this.token = '';
    this.storageToken.next('removed');
    this.cookieService.delete('id_perfil');
    this.router.navigateByUrl('/login');
    localStorage.clear();
    sessionStorage.clear();
    this.isUnloggedSession = true;
  }

  public clearUnloggedDetails(): void {
    this.token = '';
    this.storageToken.next('removed');
    this.cookieService.delete('id_perfil');
    localStorage.clear();
    sessionStorage.clear();
  }

  public setSessionIsExpired(val:boolean): void {
    this.sessionIsExpired = val;
  }

  public getSessionIsExpired(): boolean {
    return this.sessionIsExpired;
  }
}
