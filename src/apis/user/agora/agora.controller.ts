import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { ApiOkModelResponse } from 'src/utility/decorator/api-ok-model.response';
import { AgoraControllerService } from './agora.service';
import { BaseController } from 'src/core/base.controller';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChannelConnectionResponse } from './response/channel-connection.response';
import { JoinChannelDTO } from './dto/user.dto';
import { SystemCode } from 'src/core/constants/system-code';


@ApiTags('User Api')
@Controller('agora')
export class AgoraController extends BaseController {
  constructor(
    private readonly agoraService: AgoraControllerService,
  ) {
    super();
  }

  @ApiExtraModels(ChannelConnectionResponse)
  @ApiOkModelResponse({ type: ChannelConnectionResponse })
  @Get('rtc-token')
  getRtcToken() {
    try {
      return this.ok(this.agoraService.generateRtcToken());
    } catch (err) {
      this.logger.error(err.message);
      return this.error(SystemCode.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiExtraModels(ChannelConnectionResponse)
  @ApiOkModelResponse({ type: ChannelConnectionResponse })
  @Post('join-channel')
  async joinChannel(@Body() dto: JoinChannelDTO) {
    try {
      return this.ok(await this.agoraService.joinChannel(dto));
    } catch (err) {
      this.logger.error(err.message);
      return this.error(SystemCode.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiExtraModels(ChannelConnectionResponse)
  @ApiOkModelResponse({ type: ChannelConnectionResponse })
  @Get('rtm-token')
  generateRTMToken() {
    try {
      return this.ok(this.agoraService.generateRtmToken());
    } catch (err) {
      this.logger.error(err.message);
      return this.error(SystemCode.INTERNAL_SERVER_ERROR);
    }
  }

}