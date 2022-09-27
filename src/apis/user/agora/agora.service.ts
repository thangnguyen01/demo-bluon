import * as moment from 'moment';
import * as short from 'short-uuid';
import { AgencyRequestTechnicianDTO } from './dto/agency-request-technician.dto';
import { AgoraService } from 'src/utility/agora/agora.service';
import { EnvironmentService } from 'src/environment/environment.service';
import { FCMService } from 'src/core/firebase/services/fcm.service';
import { FindingSupportAgencyJobService } from 'src/core/jobs/services/finding-support-agency.job.service';
import { Injectable } from '@nestjs/common';
import { JoinChannelDTO } from './dto/user.dto';
import { TechnicianApproveRequestDTO } from './dto/technician-approve-request.dto';

@Injectable()
export class AgoraControllerService {
  constructor(
    private readonly agoraService: AgoraService,
    private readonly envService: EnvironmentService,
    private readonly agencyJobService: FindingSupportAgencyJobService,
    private readonly fcmService: FCMService,
  ) { }

  generateRtcToken() {
    // FIXME: Using real userId
    const uid = Math.floor(Math.random() * 10000);
    const channelName = short.generate();
    const token = this.agoraService.generateRtcToken({
      channelName,
      expirationTimeInSeconds: moment.duration(this.envService.ENVIRONMENT.PENDING_SYSTEM_SEARCH_TECHNICIAN, 'hours').asMilliseconds(),
      uid,
      role: 'PUBLISHER'
    });

    return {
      tokenProvider: token,
      channelName,
      userId: uid
    }
  }

  generateRtmToken() {
    // FIXME: Using real userId
    const userId = Math.floor(Math.random() * 10000).toString();
    const token = this.agoraService.generateRtmToken({
      expirationTimeInSeconds: moment.duration(this.envService.ENVIRONMENT.PENDING_SYSTEM_SEARCH_TECHNICIAN, 'hours').asMilliseconds(),
      userId,
    });

    return {
      tokenProvider: token,
      userId
    }
  }

  async joinRtmChannel() {
    const userId = short.generate();
    const token = await this.agoraService.generateRtmToken({
      expirationTimeInSeconds: moment.duration(this.envService.ENVIRONMENT.EXPIRED_TIME, 'hours').asMilliseconds(),
      userId,
    });

    return {
      tokenProvider: token,
      userId
    }
  }

  async joinChannel(dto: JoinChannelDTO) {
    const uid = Math.floor(Math.random() * 10000);
    const token = await this.agoraService.generateRtcToken({
      channelName: dto.channelName,
      expirationTimeInSeconds: moment.duration(this.envService.ENVIRONMENT.EXPIRED_TIME, 'hours').asMilliseconds(),
      uid,
      role: 'SUBSCRIBER'
    });

    return {
      tokenProvider: token,
      channelName: dto.channelName,
      userId: uid
    }
  }

  async agencyRequestTechnician(dto: AgencyRequestTechnicianDTO, user, token: string) {
    await this.agencyJobService.add({
      type: dto.type,
      userId: user._id,
      userToken: token,
      expiredTime: moment.duration(2, 'minute').asMilliseconds(),
      status: 'PENDING'
    })

    return true;
  }


  //TODO: INCR redis to remove multiple request in same time
  async technicianApproveRequest(dto: TechnicianApproveRequestDTO) {
    const jobData = await this.agencyJobService.remove({
      userId: dto.requesterId,
      type: dto.type,
    })
    if (jobData) {
      const channelName = short.generate();
      const [channelInfo, userChannel] = await Promise.all([
        this.joinChannel({ channelName }),
        this.joinChannel({ channelName })
      ]);
      await this.fcmService.sendNotification(
        {
          action: 'FOUND_TECHNICIAN',
          payload: JSON.stringify({
            type: 'FOUND_TECHNICIAN',
            userChannel
          }),
        },
        [jobData.userToken]
      );
      return channelInfo;
    } else {
      throw new Error('INVALID_CHANNEL_')
    }
  }
}