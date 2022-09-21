import { AgoraModule } from './utility/agora/agora.module';
import { EnvironmentModule } from './environment/environment.module';
import { EnvironmentService } from './environment/environment.service';
import { Module } from '@nestjs/common';
import { UserAPIModule } from './apis/user-api/user-api.module';

@Module({
  imports: [
    EnvironmentModule.register({
      provide: EnvironmentService,
      useClass: EnvironmentService,
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
    UserAPIModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
