import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class JoinChannelDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  channelName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  type?: number;

}