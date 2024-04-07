import {
  Body,
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
import { CreateUserDto } from 'src/users/dto/create-user.dto';

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
  handleRegister(@Body() createUserDto: CreateUserDto) {
    // không phải truyền @User() user: IUser vì ko có JWT
    return this.usersService.create(createUserDto);
  }

  // @UseGuards(JwtAuthGuard) // off code vì đã enable globally
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
