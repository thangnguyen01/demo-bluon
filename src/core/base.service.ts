import { Logger } from '@nestjs/common';
import { ReturnErrorModel } from './model/return-error.model';
import { ReturnOKModel } from './model/return-ok.model';
import { SystemCode } from './constants/system-code';
import { v4 } from 'uuid';

export abstract class BaseService {
  private traceId: string;
  public getTraceId(): string {
    return this.traceId;
  }
  protected readonly logger = new Logger(this.constructor.name);

  public initLoggerTraceId(traceId: string = v4()) {
    this.traceId = traceId;
    return this;
  }

  ok<T>(data: T = null): ReturnOKModel<T> {
    return new ReturnOKModel(data);
  }

  error(statusCode = SystemCode.INTERNAL_SERVER_ERROR, params?: any): ReturnErrorModel {
    throw new ReturnErrorModel(statusCode, params);
  }

}