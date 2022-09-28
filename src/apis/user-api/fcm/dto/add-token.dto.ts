import { ApiProperty } from '@nestjs/swagger';
import { FcmType } from 'src/core/infrastructure/fcm/constants/fcm.type';
import { IsNotEmpty } from 'class-validator';

export class AddTokenDTO {
  @ApiProperty()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  token: string;

  @ApiProperty()
  @IsNotEmpty()
  type: FcmType
}