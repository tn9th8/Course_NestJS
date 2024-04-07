import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { JwtAuthGuard } from './auth/passport/jwt-auth.guard';
import { TransformInterceptor } from './core/transform.interceptor';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // get port from .env
  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');

  // config middleware metadata
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector)); // enable jwt-guard globally
  app.useGlobalInterceptors(new TransformInterceptor(reflector)); // transform-interceptor

  //config view engine
  app.useStaticAssets(join(__dirname, '..', 'public')); // js, css, image
  app.setBaseViewsDir(join(__dirname, '..', 'views')); // view html
  app.setViewEngine('ejs');

  // config middleware: auto-validation-pipe
  app.useGlobalPipes(new ValidationPipe());

  // config CORS: để cho client-port-3000 có thể truy cập server
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  });

  // enable URI versioning type
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI, // v // vì dùng URI
    defaultVersion: ['1', '2'], // v1, v1
    // prefix: 'api/v', // api/v // nhưng thiết professional
  });

  // console.log('>> check path public: ', join(__dirname, '..', 'public'));
  // console.log('>> check path views: ', join(__dirname, '..', 'views'));
  await app.listen(port);
}
bootstrap();
