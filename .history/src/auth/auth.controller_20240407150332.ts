import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto, RegisterUserDto } from 'src/users/dto/create-user.dto';
import { Request, Response } from 'express';

@Controller('auth') // route "/"
export class AuthController {
  constructor(
    private authService: AuthService, // private usersService: UsersService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ResponseMessage('User login')
  handleLogin(@Req() req, @Res({ passthrough: true }) response: Response) {
    // res.cookie('key', 'value');
    return this.authService.login(req.user, response);
  }

  @Public()
  @Post('/register')
  @ResponseMessage('Register a new user')
  handleRegister(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
    // return this.usersService.register(registerUserDto);
    // ko truyền @User() user: IUser vì ko có JWT
  }

  @Get('profile')
  getProfile(@Req() req) {
    // @Request
    return req.user;
  }
}
