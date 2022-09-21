import { SystemCode } from '../constants/system-code';

export class ReturnErrorModel {
  constructor(public statusCode: SystemCode, public params?: any) {
    this.params = params;
    this.statusCode = statusCode;
  }
}