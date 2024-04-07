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
import { CreateUserDto, RegisterUserDto } from 'src/users/dto/create-user.dto';

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
  @Public()
  @Post('register')
  handleRegister(@Body() registerUserDto: RegisterUserDto) {
    // không phải truyền @User() user: IUser vì ko có JWT
    return this.usersService.handleRegisterUser(createUserDto);
  }

  // @UseGuards(JwtAuthGuard) // off code vì đã enable globally
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
