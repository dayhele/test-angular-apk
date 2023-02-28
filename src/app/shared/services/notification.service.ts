import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  NotificationList,
  NotificationReadList,
  NotificationsPreferencesList,
  NotificationsPreferencesStoreList
} from '../interfaces/notifications';
import { Http } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private http: Http) {}

  public getNotifications(id_perfil: number): Observable<NotificationList> {
    const params = {
      id_perfil
    };

    return this.http.post('v3/notification/list', params);
  }

  public readNotification(
    id_notification: number
  ): Observable<NotificationReadList> {
    const data = { id_notification };
    return this.http.post('v3/notification/read ', data);
  }

  public setNotificationsPreferences(
    id_perfil: number,
    new_notifications: number
  ): Observable<NotificationsPreferencesStoreList> {
    const options = {
      params: {
        id_perfil,
        new_notifications
      }
    };

    return this.http.get('v3/notification/preferences', options);
  }

  public getNotificationsPreferences(
    id_perfil: number
  ): Observable<NotificationsPreferencesList> {
    const data = {
      id_perfil
    };
    return this.http.post('v3/notification/preferences', data);
  }
}
