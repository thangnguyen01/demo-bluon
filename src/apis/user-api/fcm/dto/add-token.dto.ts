import { ApiProperty } from '@nestjs/swagger';
import { FcmType } from 'src/core/infrastructure/fcm/constants/fcm.type';

export class AddTokenDTO {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  token: string;

  @ApiProperty()
  type: FcmType
}