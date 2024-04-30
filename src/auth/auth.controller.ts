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
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { RegisterUserDto, UserLoginDto } from 'src/users/dto/create-user.dto';
import { Request, Response } from 'express';
import { IUser } from 'src/users/users.interface';
import { RolesService } from 'src/roles/roles.service';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ForgotPassUserDto } from 'src/users/dto/password-user.dto';

@ApiTags('auth')
@Controller('auth') // route "/"
export class AuthController {
  constructor(
    private authService: AuthService, // private usersService: UsersService,
    private roleService: RolesService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @UseGuards(ThrottlerGuard)
  @ApiBody({ type: UserLoginDto })
  @Post('/login')
  @ResponseMessage('User login')
  handleLogin(@User() user, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(user, response);
  }

  @Public()
  @Post('/register')
  @ResponseMessage('Register a new user')
  handleRegister(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
    // return this.usersService.register(registerUserDto);
    // ko truyền @User() user: IUser vì ko có JWT
  }

  @Get('/account')
  @ResponseMessage('Get user information')
  async handleGetAccount(@User() user: IUser) {
    const temp = (await this.roleService.findOne(user.role._id)) as any; // model => any (ko check type)
    user.permissions = temp.permissions;
    return { user }; // JS: req.user
  }

  @Public()
  @Get('/refresh')
  @ResponseMessage('Get user by refresh token')
  handleRefreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies['refresh_token'];
    return this.authService.processNewToken(refreshToken, response);
    // làm việc với cookie nên cần response
  }

  @Post('/logout')
  @ResponseMessage('Logout User')
  handleLogout(
    @User() user: IUser,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.logout(user, response);
    // làm việc với cookie nên cần response
  }

  @Public()
  @Post('forgot-password')
  @ResponseMessage('Forgot password of user')
  async handleForgotPassword(@Body() userDto: ForgotPassUserDto) {
    const forgotPassUser = await this.authService.forgotPassword(userDto);
    return forgotPassUser;
  }
}
