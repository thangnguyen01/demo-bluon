import { BLUON_DB } from 'src/core/constants/database.constant';
import { FCMTokenModel, FCMTokenSchema } from './models/fcm-token.model';
import { FcmTokenRepository } from './repositories/fcm-repository';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: FCMTokenModel.name, schema: FCMTokenSchema }], BLUON_DB)
  ],
  providers: [
    FcmTokenRepository
  ],
  exports: [
    FcmTokenRepository
  ],
})
export class FCMTokenModule { }