import { NgModule, Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HTTP_INTERCEPTORS
} from '@angular/common/http';

import { mergeMap, retryWhen } from 'rxjs/operators';
import { Observable, of, throwError, timer } from 'rxjs';
import {
  environment,
  requestRetry
} from '../../../../environments/environment';
import { StatusCodes } from '../../../shared/enums/status-code.enum';
import { LoginService } from '../../../shared/services/login.service';
import { AnonymousRoutesService } from '../../../shared/services/anonymous-routes.service';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
  constructor(
    private loginService: LoginService,
    private anonymousRoutesService: AnonymousRoutesService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const _anonymousRoutes = this.anonymousRoutesService.get();

    if (!this.loginService.token && !this.loginService.tokenUnlogged && !_anonymousRoutes) return null!;

    const _headers = this.createHeader(_anonymousRoutes, request);

    return next.handle(request.clone(_headers)).pipe(this.retryAfterDelay());
  }

  private retryAfterDelay(): any {
    const requestAttempts: number = requestRetry;

    return retryWhen((errors) => {
      return errors.pipe(
        mergeMap((error, currentRequestAttempt) => {
          if (error.status === StatusCodes.Unauthorized) {
            this.loginService.logout();
            return throwError(error);
          }

          if (currentRequestAttempt === requestAttempts)
            return throwError(error);

          if (this.notRepeatByErrorStatus(error)) return throwError(error);

          return of(error).pipe(mergeMap(() => timer(requestAttempts)));
        })
      );
    });
  }

  private notRepeatByErrorStatus(error: any): boolean {
    return error.status === 404 || error.status === 403|| error.status === 400;
  }

  private createHeader(_anonymousRoutes: any, req: HttpRequest<any>) {
    return _anonymousRoutes.some((route: any) => req.url.includes(route))
      ? { headers: req.headers }
      : {
          headers: req.headers.set(
            'Authorization',
            `Bearer ${this.loginService.token || this.loginService.tokenUnlogged}`
          )
        };
  }
}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true
    }
  ]
})
export class Interceptor {}
