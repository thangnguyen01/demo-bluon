import { Module } from '@nestjs/common';
import UserRouterMoudle from './apis/user/user-router.module';

@Module({
  imports: [
    UserRouterMoudle,
  ]
})
export class AppRouterModule { }
