import { Component, DoCheck, HostListener, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { ProfileService } from 'src/app/shared/services/profile.service';
import {
  NotificationListData,
  NotificationOptions
} from '../../interfaces/notifications';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, DoCheck {
  public iconPath: string = '/assets/icons/';
  public isOpened: boolean = false;
  public notifications: NotificationListData[] = [];
  public onlyRead: boolean = false;
  public idPerfil: number = 0;
  public imagePath: string = environment.notificationService;
  private firstCall: boolean = true;
  private isGranted: boolean = false;
  private currentRoute: string = "";

  constructor(
    private notificationService: NotificationService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.idPerfil = parseInt(this.profileService.selectedProfile);
    this.grantOrDennyNotificationsPermission();

    if (!!this.idPerfil) {
      this.getPreferences(this.idPerfil);
      // setInterval(() => this.getNotifications(this.idPerfil), 10000);
    }
  }

  ngDoCheck(): void {
    if (window.location.pathname !== this.currentRoute && !!this.idPerfil) {
      this.currentRoute = window.location.pathname;
      this.getNotifications(this.idPerfil);
    }
  }

  private async grantOrDennyNotificationsPermission() {
    try {
      const requestPermission = await Notification.requestPermission();
      this.isGranted = requestPermission === 'granted';
    } catch (e) {
      console.warn(e);
    }
  }

  private async callNotification(notifications: NotificationListData[]) {
    notifications.forEach(async (item) => {
      if (!item.read && this.nowDate() <= item.last_send_at) {
        const options: NotificationOptions = {
          opt: {
            body: item.text,
            icon: `${this.imagePath}/${item.thumb}`
          },
          title: 'Watch informa: ',
          link: item.link ?? ''
        };

        await this.spawnNotification(options);
      }
    });
  }

  private async spawnNotification(options: NotificationOptions) {
    const notificationPopUp = new Notification(options.title, options.opt);

    if (options.link) {
      notificationPopUp.onclick = () => {
        notificationPopUp.close();
        window.focus();
        window.open(options.link, '_blank');
      };
    }
  }

  private async setNotifications(newNotification: NotificationListData[]) {
    this.notifications = newNotification;

    if (!this.firstCall && this.isGranted) {
      await this.callNotification(this.notifications);
    }
  }

  private getNotifications(idPerfil: number) {
    this.notificationService.getNotifications(idPerfil).subscribe({
      next: async (res) => {
        this.firstCall = false;

        if (res.notifications.length > this.notifications.length) {
          this.setNotifications(res.notifications);
        }
      },
      error: (err) => console.error(err)
    });
  }

  private getPreferences(idPerfil: number) {
    this.notificationService.getNotificationsPreferences(idPerfil).subscribe({
      next: (res) => {
        if (res.success) {
          this.onlyRead = res.new_notifications;
        }
      }
    });
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key == 'Escape' && this.isOpened) {
      this.isOpened = false;
    }
  }

  public bellIcon(): string {
    return this.isOpened
      ? this.iconPath + 'notification-active.svg'
      : this.iconPath + 'notification-default.svg';
  }

  public openNotifications() {
    this.isOpened = !this.isOpened;
  }

  public hasNewNotification(): boolean {
    return this.notifications.some((n) => !n.read);
  }

  private nowDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hour}:${minutes}`;
  }
}
