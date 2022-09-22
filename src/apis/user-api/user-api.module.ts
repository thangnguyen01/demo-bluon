import { ApiController } from './api/api.controller';
import { ApiService } from './api/api.service';
import { FireBaseModule } from 'src/core/firebase/firebase.module';
import { JobsModule } from 'src/core/jobs/jobs.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    JobsModule,
    FireBaseModule,
  ],
  providers: [
    ApiService,
  ],
  controllers: [
    ApiController,
  ]
})
export class UserAPIModule { }