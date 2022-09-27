import { ApiController } from './api/api.controller';
import { ApiService } from './api/api.service';
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
    ApiService,
  ],
  controllers: [
    ApiController,
    FCMController,
  ]
})
export class UserAPIModule { }