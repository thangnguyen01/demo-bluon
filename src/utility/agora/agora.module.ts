import { AGORA_OPTIONS } from './constants/constants';
import { AgoraOptions } from './dto/agora-options.interface';
import { AgoraService } from './agora.service';
import { DynamicModule, FactoryProvider, Global, Module, ModuleMetadata } from '@nestjs/common';


export interface AgoraOptionsProvider extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any) => Promise<AgoraOptions> | AgoraOptions,
  inject?: any[];
}

@Global()
@Module({
  providers: [],
  exports: []
})
export class AgoraModule {
  static forRoot(optionsProvider: AgoraOptionsProvider): DynamicModule {
    const authGuardOptionProvider: FactoryProvider = { provide: AGORA_OPTIONS, inject: optionsProvider.inject, useFactory: optionsProvider.useFactory };
    return {
      module: AgoraModule,
      providers: [AgoraService, authGuardOptionProvider],
      exports: [AgoraService, authGuardOptionProvider]
    }
  }
} 