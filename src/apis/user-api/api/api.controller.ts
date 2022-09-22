import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { ApiOkModelResponse } from 'src/utility/decorator/api-ok-model.response';
import { ApiService } from './api.service';
import { BaseController } from 'src/core/base.controller';
import { Body, Controller, Post } from '@nestjs/common';
import { ChannelConnectionResponse } from './response/channel-connection.response';
import { JoinChannelDTO } from './dto/user.dto';
import { SystemCode } from 'src/core/constants/system-code';


@ApiTags('User Api')
@Controller('user/api/')
export class ApiController extends BaseController {
  constructor(
    private readonly apiService: ApiService,
  ) {
    super();
  }

  @ApiExtraModels(ChannelConnectionResponse)
  @ApiOkModelResponse({ type: ChannelConnectionResponse })
  @Post('channel')
  async addToken() {
    try {
      return this.ok(await this.apiService.generateChannel());
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
      return this.ok(await this.apiService.joinChannel(dto));
    } catch (err) {
      this.logger.error(err.message);
      return this.error(SystemCode.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiExtraModels(ChannelConnectionResponse)
  @ApiOkModelResponse({ type: ChannelConnectionResponse })
  @Post('rtm-token')
  async generateRTMToken() {
    try {
      return this.ok(await this.apiService.joinRtmChannel());
    } catch (err) {
      this.logger.error(err.message);
      return this.error(SystemCode.INTERNAL_SERVER_ERROR);
    }
  }

}