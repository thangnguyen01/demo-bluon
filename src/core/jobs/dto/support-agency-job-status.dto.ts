export class SupportAgencyJobStatusDTO {
  userId?: string;
  userToken?: string;
  technicianTokens?: [];
  expiredTime?: number;
  status?: 'SEARCHING' | 'PENDING' | 'FOUND';
  type?: string
}

export class NotifyFoundSuccessDTO {
  userId?: any;
  type: string;
}