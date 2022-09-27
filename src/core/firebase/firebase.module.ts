import { FCMService } from './services/fcm.service';
import { FCMTokenModule } from '../infrastructure/fcm/fcm-token.module';
import { FirebaseService } from './services/firebase.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    FCMTokenModule
  ],
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