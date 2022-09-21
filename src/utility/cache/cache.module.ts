import { CacheProvider } from './dto/cache-provider';
import { CacheService } from './cache.service';
import { DynamicModule, Module, Provider } from '@nestjs/common';

@Module({

})
export class CacheModule {
  static forRoot(optionsProvider: Provider<CacheProvider>): DynamicModule {
    return {
      module: CacheModule,
      providers: [CacheService, optionsProvider],
      exports: [CacheService]
    }
  }
}