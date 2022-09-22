import { CacheProvider } from './dto/cache-provider';
import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { RedisCacheService } from './redis-cache.service';

@Global()
@Module({
  providers: [],
  exports: []
})
export class CacheModule {
  static forRoot(optionsProvider: Provider<CacheProvider>): DynamicModule {
    return {
      module: CacheModule,
      providers: [RedisCacheService, optionsProvider],
      exports: [RedisCacheService]
    }
  }
}