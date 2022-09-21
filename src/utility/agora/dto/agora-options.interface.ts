import { Injectable } from '@nestjs/common';

@Injectable()
export class AgoraOptions {
  appID: string;
  appCertificateID: string;
}
