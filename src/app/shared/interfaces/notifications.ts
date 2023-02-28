export interface NotificationList {
  success: boolean;
  notifications: NotificationListData[];
}

export interface NotificationListData {
  id: number;
  link?: string | null;
  text: string;
  thumb: string;
  last_send_at: string;
  read: boolean;
}

export interface NotificationReadList {
  success: boolean;
  message: string;
}

export interface NotificationsPreferencesListData {
  id: number;
  profile_id: number;
  new_notifications: boolean;
}

export interface NotificationsPreferencesList {
  success: boolean;
  new_notifications: boolean;
}

export interface NotificationsPreferencesStoreList {
  success: boolean;
  message: string;
}

export interface NotificationOptions {
  opt: {
    body: string;
    icon: string;
  };
  title: string;
  link: string;
}
