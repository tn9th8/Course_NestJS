import {
  Controller,
  Get,
  Post,
  Render,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorator/customize';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { UsersService } from 'src/users/users.service';

@Controller('auth') // route "/"
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  // Guard
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  handleLogin(@Request() req) {
    return this.authService.login(req.user);
  }

  // @UseGuards(JwtAuthGuard) // off code vì đã enable globally
  @Post('register')
  handleRegister(@Request() req) {
    return this;
  }

  // @UseGuards(JwtAuthGuard) // off code vì đã enable globally
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
