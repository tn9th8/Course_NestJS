import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // route "/"
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // route " " => Restful API
  @Render('home')
  handleHomePage() {
    // port from .env

    const message1 = this.appService.getHello();

    return {
      message: message1,
    };
    // return 'this.appService.getHello()';
  }
}
