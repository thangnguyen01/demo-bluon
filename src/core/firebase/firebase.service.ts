import * as firebaseAdmin from 'firebase-admin';
import { EnvironmentFirebaseConfig } from './config/firebase';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FirebaseService {
  constructor() {
    if (firebaseAdmin.apps.length === 0) {
      const serviceAccount = EnvironmentFirebaseConfig.dev;
      firebaseAdmin.initializeApp(
        {
          credential: firebaseAdmin.credential.cert(serviceAccount),
          databaseURL: `https://example-bluon-realtime-support.firebaseio.com`,
        },
        'firebaseApp',
      );
    }
  }

  getMessaging() {
    return firebaseAdmin.app('firebaseApp').messaging();
  }
}
