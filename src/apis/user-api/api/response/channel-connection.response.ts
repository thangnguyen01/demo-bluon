import { ApiProperty } from '@nestjs/swagger';

export class ChannelConnectionResponse {
  @ApiProperty({ type: String })
  tokenProvider: string;

  @ApiProperty({ type: String })
  channelName: string;

  @ApiProperty({ type: Number })
  uid: number;
}