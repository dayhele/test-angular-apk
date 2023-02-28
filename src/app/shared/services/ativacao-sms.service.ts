import { Injectable } from '@angular/core';
import { RegisterProfileSms } from '../interfaces/register-profile-sms';
import { Http } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AtivacaoSmsService {
  constructor(private http: Http) {}

  public activateSMS(code: string) {
    return this.http.post('v3/sms/activate', {
      code: code,
      call: 'api'
    });
  }

  public reactivateSMS(code: string, id: string) {
    return this.http.post('v3/sms/resend', {
      code,
      id,
      call: 'api'
    });
  }

  public registerProfileSms(registerProfileSms: RegisterProfileSms) {
    return this.http.post('v3/sms/smsform', registerProfileSms);
  }
}
