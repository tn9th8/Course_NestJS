import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  app.useStaticAssets(join(__dirname, '..', 'public')); // js, css, image
  app.setBaseViewsDir(join(__dirname, '..', 'views')); // view html
  console.log('>> check path public: ', join(__dirname, '..', 'public'));
  console.log('>> check path views: ', join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  await app.listen(process.env.PORT);
}
bootstrap();
