import { AgoraController } from './agora/agora.controller';
import { AgoraControllerService } from './agora/agora.service';
import { FCMController } from './fcm/fcm.controller';
import { FCMTokenModule } from 'src/core/infrastructure/fcm/fcm-token.module';
import { FireBaseModule } from 'src/core/firebase/firebase.module';
import { JobsModule } from 'src/core/jobs/jobs.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    JobsModule,
    FireBaseModule,
    FCMTokenModule,
  ],
  providers: [
    AgoraControllerService,
  ],
  controllers: [
    AgoraController,
    FCMController,
  ]
})
export class UserModule { }