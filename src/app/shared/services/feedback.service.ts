import { Injectable } from '@angular/core';
import { Http } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  constructor(private http: Http) {}

  public sendFeedback(form: FormData) {
    return this.http.post('v3/sendfeedback', form);
  }
}
