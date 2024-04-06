import {
  Controller,
  Get,
  Post,
  Render,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { LocalAuthGuard } from './auth/passport/local-auth.guard';
import { JwtAuthGuard } from './auth/passport/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { Public } from './decorator/customize';

@Controller() // route "/"
export class AuthController {
  constructor(private authService: AuthService) {}

  // Guard
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  handleLogin(@Request() req) {
    return this.authService.login(req.user);
  }

  // @UseGuards(JwtAuthGuard) // off code vì đã enable globally
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
