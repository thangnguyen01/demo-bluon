import { FCMService } from './services/fcm.service';
import { FirebaseService } from './services/firebase.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    FCMService,
    FirebaseService
  ],
  exports: [
    FCMService,
    FirebaseService
  ]
})
export class FireBaseModule { }