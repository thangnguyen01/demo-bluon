import { ApiController } from './api/api.controller';
import { ApiService } from './api/api.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [
    ApiService,
  ],
  controllers: [
    ApiController,
  ]
})
export class UserAPIModule { }