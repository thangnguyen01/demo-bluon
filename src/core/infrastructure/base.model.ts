import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export abstract class BaseModel {
  @ApiProperty({ type: String })
  _id?: string;

  @ApiProperty()
  @Prop({ type: Number, index: true })
  createdAt?: number;

  @ApiProperty()
  @Prop({ type: Number, index: true })
  updatedAt?: number;
}