import * as _ from 'lodash';
import { FirebaseService } from './firebase.service';
import { Injectable } from '@nestjs/common';
import { messaging } from 'firebase-admin';
import { OSFcmConfig } from '../dto/send-notification.dto';

@Injectable()
export class FCMService {
  constructor(
    private readonly firebaseService: FirebaseService,
  ) { }

  async sendNotification(
    data: { [index: string]: string },
    tokenReceives: string[],
    config = new OSFcmConfig(),
  ) {
    const content: messaging.MulticastMessage = {
      tokens: [],
      data,
    };
    _.assignIn(content, config);
    const notificationObject = _.cloneDeep(content);
    const chunks = _.chunk(tokenReceives, 500);

    for (let index = 0; index < chunks.length; index++) {
      const chunk = chunks[index];
      this._sendMulticast(
        _.assignIn(_.cloneDeep(notificationObject), {
          tokens: chunk,
        }),
      );
    }
  }

  private async _sendMulticast(content: messaging.MulticastMessage) {
    await this.firebaseService
      .getMessaging()
      .sendMulticast(content)
      .then(res => {
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
          //TODO: remove invalid Token
        }
      });
  }
}
