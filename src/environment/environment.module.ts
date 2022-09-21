import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { EnvironmentService } from './environment.service';

@Global()
@Module({
  providers: [EnvironmentService],
  exports: [EnvironmentService],
})
export class EnvironmentModule {
  static register<R extends EnvironmentService>(EnvironmentServiceProvider: Provider<R>): DynamicModule {
    return {
      providers: [EnvironmentServiceProvider],
      exports: [EnvironmentServiceProvider],
      module: EnvironmentModule,
    };
  }
}
