export class GenerateTokenDTO {
  channelName: string;
  expirationTimeInSeconds: number;
  uid: number;
  role?: 'PUBLISHER' | 'SUBSCRIBER';
}