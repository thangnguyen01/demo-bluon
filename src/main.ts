import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EnvironmentService } from './environment/environment.service';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { ResponseModel } from './core/model/model.response';
import { UserModule } from './apis/user/user.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({ origin: true, methods: ['GET', 'POST', 'DELETE', 'PUT'] });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: error => {
        return new BadRequestException(error);
      },
    }),
  );
  app.useStaticAssets(join(__dirname, '..', 'documentation'));
  app.setGlobalPrefix('api/v1', { exclude: ['', 'healthcheck'] });
  const envService = app.get(EnvironmentService);
  const API_PORT = envService.ENVIRONMENT.PORT;
  setupSwaggerUI(app);
  await app.listen(API_PORT);
  console.log(`App is running on ${API_PORT}`);
  console.log(`http://127.0.0.1:${API_PORT}/docs/user`);
  console.log(`http://127.0.0.1:${API_PORT}/docs/admin`);
}



function setupSwaggerUI(app: NestExpressApplication) {
  const userOptions = new DocumentBuilder()
    .setTitle('User API')
    .setDescription('User API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const userDocument = SwaggerModule.createDocument(app, userOptions, {
    include: [UserModule],
    extraModels: [Boolean, Number, String, ResponseModel],
  });
  SwaggerModule.setup('docs/user', app, userDocument);
}

bootstrap();
