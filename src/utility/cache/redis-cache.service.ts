import { CacheService } from './cache.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisCacheService extends CacheService {

}