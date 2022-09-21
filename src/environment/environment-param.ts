import * as Reflect from 'reflect-metadata';
import { Expose, Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

Reflect;
export class EnvironmentParam {
  @IsNumber()
  @Type(() => Number)
  @Expose()
  public API_PORT: number;

  @IsString()
  @Type(() => String)
  @Expose()
  public LOGGER_IGNORE_METHODS = '';

  @IsString()
  @Type(() => String)
  @Expose()
  public REDIS_URL = 'redis://127.0.0.1:6379';

  @IsNumber()
  @Type(() => Number)
  @Expose()
  public EXPIRED_TIME: number;

  @IsString()
  @Type(() => String)
  @Expose()
  public EXECUTION_ENVIRONMENT: string

  @IsString()
  @Type(() => String)
  @Expose()
  public AGORA_APP_ID: string

  @IsString()
  @Type(() => String)
  @Expose()
  public AGORA_APP_CERTIFICATE: string

  @IsString()
  @Type(() => String)
  @Expose()
  public DB_CONNECTION: string

}
