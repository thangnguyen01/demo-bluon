import { AddTokenDTO } from './dto/add-token.dto';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/core/base.controller';
import { Body, Controller, Post } from '@nestjs/common';
import { FcmTokenRepository } from 'src/core/infrastructure/fcm/repositories/fcm-repository';
import { SystemCode } from 'src/core/constants/system-code';

@ApiTags('FCM')
@Controller('fcm')
export class FCMController extends BaseController {
  constructor(
    private readonly fcmRepository: FcmTokenRepository
  ) {
    super()
  }

  @Post('token')
  async addToken(
    @Body() dto: AddTokenDTO,
  ) {
    try {
      await this.fcmRepository.updateOne(
        { token: dto.token },
        {
          token: dto.token,
          userId: dto.userId,
          type: dto.type
        },
        { upsert: true },
      );
    } catch (err) {
      this.logger.error(err.message);
      return this.error(SystemCode.INTERNAL_SERVER_ERROR);
    }
  }
}