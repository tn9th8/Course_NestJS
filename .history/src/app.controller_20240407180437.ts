import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth/auth.service';

@Controller() // route "/"
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
    private authService: AuthService,
  ) {}

  // // MVC
  // @Get() // route " " => Restful API
  // @Render('home')
  // handleHomePage() {
  //   // port from .env
  //   console.log('>> check port = ', this.configService.get<string>('PORT'));
  //   const message1 = this.appService.getHello();

  //   return {
  //     message: message1,
  //   };
  //   // return 'this.appService.getHello()';
  // }

  // @Get('abc') /// route " "  /
  // getHello1(): string {
  //   return 'this.appService.getHello() abc';
  // }
}
