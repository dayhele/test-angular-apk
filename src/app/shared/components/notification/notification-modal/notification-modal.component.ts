import { Component, Input, OnInit } from '@angular/core';
import { NotificationListData } from 'src/app/shared/interfaces/notifications';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.scss']
})
export class NotificationModalComponent implements OnInit {
  @Input() notifications: NotificationListData[] = [];
  @Input() onlyRead: boolean = false;
  @Input() idPerfil: number = 0;
  @Input() imagePath: string = '';

  private notificationsFiltered: NotificationListData[] = [];
  public expanded: boolean = false;

  constructor(
    private notificationData: NotificationComponent,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.notificationsFiltered = this.notifications;
    this.notifications = this.notificationsFiltered;

    this.filterNotifications();
  }

  public changeToggle() {
    if (!!this.idPerfil) {
      this.notificationService
        .setNotificationsPreferences(this.idPerfil, Number(this.onlyRead))
        .subscribe();

      this.filterNotifications();
    }
  }

  public filterNotifications() {
    this.notifications = this.notificationsFiltered.filter((n) => {
      return this.onlyRead ? !n.read : !this.onlyRead;
    });
  }

  public read(n: NotificationListData) {
    if (!n.read) {
      this.notificationService.readNotification(n.id).subscribe();
      n.read = true;
      this.filterNotifications();
    }

    if (n.link) {
      window.open(n.link, '_blank');
    }
  }

  public expandeCard() {
    this.expanded = !this.expanded;
  }

  public notificationsNumber() {
    return !this.expanded && this.notifications.length >= 4
      ? 4
      : this.notifications.length;
  }

  public formatDate(notificationDate: string): string {
    const date = new Date(notificationDate);
    const day = String(date.getDate() + 1).padStart(2, '0');
    const month = date.toLocaleDateString('pt-br', {
      month: 'long'
    });

    return `${day} de ${month[0].toUpperCase() + month.substring(1)}`;
  }

  public closeNotification() {
    this.notificationData.isOpened = false;
  }
}
