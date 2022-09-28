import { AgoraModule } from './utility/agora/agora.module';
import { BLUON_DB } from './core/constants/database.constant';
import { CacheModule } from './utility/cache/cache.module';
import { CacheProvider } from './utility/cache/dto/cache-provider';
import { EnvironmentModule } from './environment/environment.module';
import { EnvironmentService } from './environment/environment.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './apis/user/user.module';
import { AppRouterModule } from './app-router.module';

@Module({
  imports: [
    EnvironmentModule.register({
      provide: EnvironmentService,
      useClass: EnvironmentService,
    }),

    MongooseModule.forRootAsync({
      useFactory: async (envService: EnvironmentService) => ({
        uri: envService.ENVIRONMENT.MONGODB_CONNECTION_STRING,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      connectionName: BLUON_DB,
      inject: [EnvironmentService],
    }),
    AgoraModule.forRoot({
      useFactory: (env: EnvironmentService) => {
        return {
          appCertificateID: env.ENVIRONMENT.AGORA_APP_CERTIFICATE,
          appID: env.ENVIRONMENT.AGORA_APP_ID
        }
      },
      inject: [EnvironmentService]
    }),
    CacheModule.forRoot({
      provide: CacheProvider,
      useFactory: (env: EnvironmentService) => {
        return {
          connectionString: env.ENVIRONMENT.REDIS_URL
        }
      },
      inject: [EnvironmentService]
    }),
    AppRouterModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
