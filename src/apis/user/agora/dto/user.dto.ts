import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class JoinChannelDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  channelName: string;
}