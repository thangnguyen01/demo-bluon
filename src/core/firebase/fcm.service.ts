import * as _ from 'lodash';
import { FirebaseService } from './firebase.service';
import { Injectable } from '@nestjs/common';
import { messaging } from 'firebase-admin';
import { OSFcmConfig } from './dto/send-notification.dto';

@Injectable()
export class FCMService {
  constructor(
    private readonly firebaseService: FirebaseService,
  ) { }

  async sendNotification(
    conditions: { [index: string]: any },
    data: { [index: string]: string },
    getNotificationContent?: (language: string) => Promise<messaging.Notification>,
    config = new OSFcmConfig(),
    ignoreIfConnectedSocket = false,
  ) {
    if (ignoreIfConnectedSocket) {
      conditions.connectedSocket = false;
    }
    const content: messaging.MulticastMessage = {
      tokens: [],
      data,
    };
    if (getNotificationContent) {
      _.assignIn(content, config);
    } else {
      content.android = {
        priority: 'high',
      };
    }

    const fcmTokenGroupByLanguage = [];
    Object.keys(fcmTokenGroupByLanguage).map(async language => {
      const notificationObject = _.cloneDeep(content);
      if (getNotificationContent) {
        notificationObject.notification = await getNotificationContent(language);
      }

      const tokens = fcmTokenGroupByLanguage[language].map(fcmToken => fcmToken.token);
      const chunks = _.chunk(tokens, 500);

      for (let index = 0; index < chunks.length; index++) {
        const chunk = chunks[index];
        this._sendMulticast(
          _.assignIn(_.cloneDeep(notificationObject), {
            tokens: chunk,
          }),
        );
      }
    })
  }

  private async _sendMulticast(content: messaging.MulticastMessage) {
    await this.firebaseService
      .getMessaging()
      .sendMulticast(content)
      .then(async res => {
        const invalidTokens = [];
        for (let index = 0; index < res.responses.length; index++) {
          if (
            !res.responses[index].success &&
            ['messaging/mismatched-credential', 'messaging/registration-token-not-registered'].includes(
              res.responses[index].error.code,
            )
          ) {
            invalidTokens.push(content.tokens[index]);
          }
        }
      });
  }
}
