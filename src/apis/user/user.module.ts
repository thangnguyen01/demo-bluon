import { AgoraController } from './agora/agora.controller';
import { AgoraControllerService } from './agora/agora.service';
import { FireBaseModule } from 'src/core/firebase/firebase.module';
import { JobsModule } from 'src/core/jobs/jobs.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    JobsModule,
    FireBaseModule,
  ],
  providers: [
    AgoraControllerService,
  ],
  controllers: [
    AgoraController,
  ]
})
export class UserModule { }