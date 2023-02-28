import { Injectable } from '@angular/core';
import { Http } from './http.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CheckSubscription {

  private debugMode: boolean = false;

  constructor(
    private loginService: LoginService,
    private Http: Http
  ) { }

  check() {
    if(this.loginService.token != null) {
      if(this.debugMode) console.log("validação token: "+this.loginService.token);

      this.Http.post('v3/account/check', {}).subscribe(() => {
        if(this.debugMode) console.log('validação token: sucess');
      },
      (err) => {
        if(this.debugMode) console.log('validação token: faill');

        if(err.status == 401){ //Caso o backend retorne o code 401 deslogamos o usuario.
          this.loginService.setSessionIsExpired(true);
          this.loginService.logout();
        }
      }
      )
    }
  }
}
