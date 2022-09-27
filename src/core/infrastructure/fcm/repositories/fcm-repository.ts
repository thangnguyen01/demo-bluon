import { BaseRepository } from '../../base.repository';
import { BLUON_DB } from 'src/core/constants/database.constant';
import { FCMTokenDoc, FCMTokenModel } from '../models/fcm-token.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class FcmTokenRepository extends BaseRepository<FCMTokenDoc, FCMTokenModel> {
  constructor(@InjectModel(FCMTokenModel.name, BLUON_DB) public override readonly model: Model<FCMTokenDoc>) {
    super();
  }
}
