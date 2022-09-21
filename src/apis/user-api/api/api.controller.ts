import { ApiService } from './api.service';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/core/base.controller';
import { Controller, Post } from '@nestjs/common';
import { SystemCode } from 'src/core/constants/system-code';


@ApiTags('User Api')
@Controller('user/api/')
export class ApiController extends BaseController {
  constructor(
    private readonly apiService: ApiService,
  ) {
    super();
  }
  @Post('channel')
  async addToken() {
    try {
      return this.ok(await this.apiService.generateChannel());
    } catch (err) {
      this.logger.error(err.message);
      return this.error(SystemCode.INTERNAL_SERVER_ERROR);
    }
  }
}