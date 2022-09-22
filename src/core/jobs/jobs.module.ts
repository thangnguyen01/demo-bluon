import { FindingSupportAgencyJobService } from './services/finding-support-agency.job.service';
import { FireBaseModule } from '../firebase/firebase.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    FireBaseModule,
  ],
  exports: [
    FindingSupportAgencyJobService
  ],
  providers: [
    FindingSupportAgencyJobService
  ]
})
export class JobsModule { }