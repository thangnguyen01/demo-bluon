import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { EnvironmentParam } from './environment-param';
import { Injectable, Logger, Optional } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

export type ClassConstructor<EnvironmentParam> = {
  new(...args: any[]): EnvironmentParam;
};

@Injectable()
export class EnvironmentService {
  private logger = new Logger(this.constructor.name);

  public readonly ENVIRONMENT: EnvironmentParam;
  constructor(@Optional() classValidate: ClassConstructor<EnvironmentParam> = EnvironmentParam) {
    let config: any;
    try {
      config = dotenv.parse(fs.readFileSync('.env'));
    } catch (error) {
      this.logger.warn(`System will get env from process`);
      config = process.env;
    }
    this.ENVIRONMENT = plainToClass(classValidate, {
      ...new classValidate(),
      ...config,
    });
    const res = validateSync(this.ENVIRONMENT);
    if (res.length) {
      this.logger.log(JSON.stringify(res));
      throw res;
    }
  }
}

