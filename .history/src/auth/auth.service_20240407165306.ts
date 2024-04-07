import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { IUser } from 'src/users/users.interface';
import { ConfigService } from '@nestjs/config';
import ms from 'ms'; // hàm
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService, // để lấy ra data của .env
  ) {}

  // username, pass la 2 tham so la Passport nem ve
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user) {
      // neu dung email va co user co ton tai
      const isValid = this.usersService.isValidPassword(pass, user.password);
      if (isValid === true) {
        return user;
      }
    }
    return null;
  }

  // dùng user: any từng là TS ko biết user là cái gì, ko biết type của biến này
  async login(user: IUser, response: Response) {
    const { _id, name, email, role } = user;
    const payload = {
      sub: 'token login',
      iss: 'from server',
      _id,
      name,
      email,
      role,
    };
    const refresh_token = this.createRefreshToken(payload);

    // update user with refresh token
    await this.usersService.updateUserToken(refresh_token, _id);

    // set refresh_token as cookies at client
    response.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      maxAge: ms(this.configService.get<string>('JWT_REFRESH_EXPIRE')) * 1000, //milisecond
    });

    // response
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        _id,
        name,
        email,
        role,
      },
    };
  }

  // arrow function
  createRefreshToken = (payload: any) => {
    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn:
        ms(this.configService.get<string>('JWT_REFRESH_EXPIRE')) / 1000, // dv: second
    });
    return refresh_token;
  };

  processNewToken = async (refreshToken: string) => {
    try {
      // verify: xác thực và decode token luôn
      this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      });

      let user = await this.usersService.findUserByToken(refreshToken);
      if (user) {
        // update refresh token
      } else {
        throw new BadRequestException(
          `Refresh token không hợp lệ. Vui lòng login`,
        );
      }

      console.log(user);
    } catch (error) {
      throw new BadRequestException(
        `Refresh token không hợp lệ. Vui lòng login`,
      );
    }
  };

  async register(userDto: RegisterUserDto) {
    let userRegister = await this.usersService.register(userDto);

    return {
      _id: userRegister?._id,
      createdAt: userRegister?.createdAt,
      // use ? to avoid the case that newUser = null;
    };
  }
}
