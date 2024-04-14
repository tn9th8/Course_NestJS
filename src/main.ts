import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { JwtAuthGuard } from './auth/passport/jwt-auth.guard';
import { TransformInterceptor } from './core/transform.interceptor';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // get port from .env
  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');

  // config middleware: use metedata
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector)); // enable jwt-guard globally
  app.useGlobalInterceptors(new TransformInterceptor(reflector)); // transform-interceptor

  //config view engine
  app.useStaticAssets(join(__dirname, '..', 'public')); // js, css, image
  app.setBaseViewsDir(join(__dirname, '..', 'views')); // view html
  app.setViewEngine('ejs');

  console.log('>> check path public: ', join(__dirname, '..', 'public'));
  console.log('>> check path views: ', join(__dirname, '..', 'views'));

  // config middleware: validation-pipe // whitelist: tranh update mat data
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // config cookies: server can read and set cookies at client
  app.use(cookieParser());

  // config CORS: để cho client-port-3000 có thể truy cập server
  app.enableCors({
    origin: true, // 'http://localhost:3000', // ""
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // ""
    preflightContinue: false, // ""
    credentials: true,
  });

  // enable URI versioning type
  // app.setGlobalPrefix('swagger');
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI, // v // vì dùng URI
    defaultVersion: ['1', '2'], // v1, v1
  });

  // config helmet
  app.use(helmet());

  // config swagger
  const config = new DocumentBuilder()
    .setTitle('ITViec APIs Document')
    .setDescription('All module API description')
    .setVersion('1.0')
    // .addTag('cats')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'Bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'token',
    )
    .addSecurityRequirements('token')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(port);
}
bootstrap();
