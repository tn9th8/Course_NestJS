import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/passport/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // get port from .env
  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');

  // enable jwt-guard globally
  const reflector = app.get(Reflector);
  // app.useGlobalGuards(new JwtAuthGuard(reflector));

  //config view engine
  app.useStaticAssets(join(__dirname, '..', 'public')); // js, css, image
  app.setBaseViewsDir(join(__dirname, '..', 'views')); // view html
  app.setViewEngine('ejs');
  console.log('>> check path public: ', join(__dirname, '..', 'public'));
  console.log('>> check path views: ', join(__dirname, '..', 'views'));

  // coonfig auto-validation
  app.useGlobalPipes(new ValidationPipe());

  // config CORS
  app.enableCors();

  await app.listen(port);
}
bootstrap();
