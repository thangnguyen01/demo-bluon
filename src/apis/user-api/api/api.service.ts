import * as moment from 'moment';
import { AgoraService } from 'src/utility/agora/agora.service';
import { EnvironmentService } from 'src/environment/environment.service';
import { Injectable } from '@nestjs/common';
// import * as short from 'short-uuid';

@Injectable()
export class ApiService {
  constructor(
    private readonly agoraService: AgoraService,
    private readonly envService: EnvironmentService,
  ) { }

  async generateChannel() {

    const uid = Math.floor(Math.random() * 10000);
    const token = await this.agoraService.generateRtcToken({
      channelName: 'channel-test',
      expirationTimeInSeconds: moment.duration(this.envService.ENVIRONMENT.EXPIRED_TIME, 'hours').asMilliseconds(),
      uid,
      role: 'PUBLISHER'
    });

    return {
      tokenProvider: token,
      channelName: 'channel-test',
      userId: uid
    }
  }
}