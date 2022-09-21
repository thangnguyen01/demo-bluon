import { messaging } from 'firebase-admin';

export class OSFcmConfig {
  android: messaging.AndroidConfig = {
    priority: 'high',
    notification: {
      sound: 'default',
    }
  };
  webpush: messaging.WebpushConfig = { fcmOptions: {} };
  apns: messaging.ApnsConfig = {
    payload: {
      aps: {
        sound: 'default',
      }
    }
  };

  constructor(data?: OSFcmConfig | string) {
    if (typeof data === 'string') {
      this.webpush.fcmOptions.link = data;
    } else {
      Object.assign(this, data);
    }
  }
}
export class SendNotificationDTO {
  userIds: string[];
  action: string;
  params: { [index: string]: any };
  notification: messaging.Notification | { [index: string]: messaging.Notification };
  config: OSFcmConfig;
  ignoreIfConnectedSocket?= false;
}