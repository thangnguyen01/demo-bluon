import * as _ from 'lodash';
import * as redis from 'redis';
import { LoggerService } from 'src/core/common/logger/logger.service';


export abstract class CacheService {
  public db = 0;
  private _client: redis.RedisClientType<any>;
  protected logger = new LoggerService(this.constructor.name);

  get client() {
    if (!this._client) {
      try {
        this._client = redis.createClient({ url: `${this.connectionString}/${this.db}` });
        this._client.connect();
      } catch (e) {
        this.logger.error(e.message);
      }
    }

    return this._client;
  };

  constructor(private connectionString: string) { }

  public async getJSON<T>(cacheKey: string): Promise<T> {
    const result = await this.client.get(cacheKey);
    return result ? JSON.parse(result) : null;
  }

  public async listJSON<T>(cacheKeys: string[]): Promise<T[]> {
    const result = await this.client.mGet(_.uniq(cacheKeys));
    return result.length ? result.map(item => JSON.parse(item)) : [];
  }

  public async setJSON(
    key: string,
    value: any,
    lifetime?: number,
  ) {
    return await this.client.set(key, JSON.stringify(value), lifetime ? { PX: lifetime } : {});
  }

  public async del(key: string | string[]) {
    return await this.client.del(key);
  }

  public async set(
    key: string,
    value: any,
    lifetime?: number,
  ) {
    return await this.client.set(key, value, lifetime ? { PX: lifetime } : {});
  }

  public async get(cacheKey: string) {
    return await this.client.get(cacheKey);
  }

  public async list(cacheKeys: string[]) {
    const result = await this.client.mGet(_.uniq(cacheKeys));
    return result.length ? result.map(item => item) : [];
  }
}