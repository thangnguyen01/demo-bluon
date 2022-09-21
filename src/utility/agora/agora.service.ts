import axios, { AxiosInstance } from 'axios';
import { AGORA_OPTIONS } from './constants/constants';
import { AgoraOptions } from './dto/agora-options.interface';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateRuleDTO } from './dto/create-rule.dto';
import { GenerateRTMTokenDTO } from './dto/generate-rtm-token.dto';
import { GenerateTokenDTO } from './dto/generate-token.dto';
import { RtcRole, RtcTokenBuilder, RtmRole, RtmTokenBuilder } from 'agora-access-token';


@Injectable()
export class AgoraService {
  private axios: AxiosInstance;
  constructor(@Inject(AGORA_OPTIONS) private readonly agoraOptions: AgoraOptions) {
    this.axios = axios.create({
      baseURL: 'https://api.agora.io/dev/v1/',
      timeout: 10000,
    });
  }

  generateRtcToken(dto: GenerateTokenDTO) {
    const { channelName, expirationTimeInSeconds, uid, role } = dto
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs =
      expirationTimeInSeconds === 0 ? 0 : currentTimestamp + expirationTimeInSeconds;
    const userRole = role === 'PUBLISHER' ? RtcRole.PUBLISHER : RtcRole.SUBSCRIBER;

    return RtcTokenBuilder.buildTokenWithUid(
      this.agoraOptions.appID,
      this.agoraOptions.appCertificateID,
      channelName,
      uid,
      userRole,
      privilegeExpiredTs,
    );
  }

  generateRtmToken(dto: GenerateRTMTokenDTO) {
    const { expirationTimeInSeconds, userAccount } = dto
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    return RtmTokenBuilder.buildToken(
      this.agoraOptions.appID,
      this.agoraOptions.appCertificateID,
      String(userAccount),
      RtmRole.Rtm_User,
      privilegeExpiredTs,
    );
  };

  createRule(dto: CreateRuleDTO) {
    const { cname, uid, ip, time, } = dto;
    const data: any = {
      appid: this.agoraOptions.appID,
      privileges: ['join_channel'],
    };
    this.mapping(data, { cname, uid, ip, time, });
    return this.axios.post('kicking-rule', data);
  }

  async getChannelUsers({ channelName }) {
    if (!channelName) {
      throw new BadRequestException('Channel name is required!');
    }

    const accessToken = this.getAgoraAccessToken();

    const result = await this.axios.get(`channel/user/${this.agoraOptions.appID}/${channelName}`, {
      headers: {
        Authorization: accessToken,
      },
    });

    return result.data;
  }

  async banAllUsers({ channelName, provider }) {
    if (!channelName || provider !== 'agora') {
      return true;
    }
    return true;
  }

  getAgoraAccessToken() {
    const [customerID, customerSecret] = ['customerId', 'customerSecret'];

    const base64 = Buffer.from(`${customerID}:${customerSecret}`).toString('base64');

    const accessToken = `Basic ${base64}`;

    return accessToken;
  }

  mapping(desObject, targetObject) {
    if (!targetObject) return;
    for (const [key, value] of Object.entries(targetObject)) {
      if (value !== null || value !== undefined) {
        desObject[key] = value;
      }
    }
  }
}
