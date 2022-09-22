import { Injectable } from '@nestjs/common';

@Injectable()
export class CacheProvider {
  connectionString: string;
}