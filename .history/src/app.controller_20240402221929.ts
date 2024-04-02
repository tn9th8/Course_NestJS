import {
  Controller,
  Get,
  Post,
  Render,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

@Controller() // route "/"
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  // MVC
  @Get() // route " " => Restful API
  @Render('home')
  handleHomePage() {
    // port from .env
    console.log('>> check port = ', this.configService.get<string>('PORT'));
    const message1 = this.appService.getHello();

    return {
      message: message1,
    };
    // return 'this.appService.getHello()';
  }

  @Get('abc') /// route " "  /
  getHello1(): string {
    return 'this.appService.getHello() abc';
  }

  // Guard
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  handleLogin(@Request() req) {
    return req.user;
  }
}
