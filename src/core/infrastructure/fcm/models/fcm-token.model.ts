import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from '../../base.model';
import { Document } from 'mongoose';
import { FcmType } from '../constants/fcm.type';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type FCMTokenDoc = FCMTokenModel & Document;

@Schema({ collection: 'fcmTokens', versionKey: false })
export class FCMTokenModel extends BaseModel {
  @ApiProperty()
  @Prop({ index: 'text' })
  session: string;

  @ApiProperty()
  @Prop({ index: 'text' })
  userId: string;

  @ApiProperty()
  @Prop({ index: 'text' })
  token: string;

  @ApiProperty()
  @Prop()
  type: FcmType;

  constructor(item?: FCMTokenModel) {
    console.log(FCMTokenModel.name)

    super();
    Object.assign(this, item);
  }
}

export const FCMTokenSchema = SchemaFactory.createForClass(FCMTokenModel);
