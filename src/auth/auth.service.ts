import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { IUser } from 'src/users/users.interface';
import { ConfigService } from '@nestjs/config';
import ms from 'ms'; // hàm
import { Response } from 'express';
import { RolesService } from 'src/roles/roles.service';
import { ForgotPassUserDto } from 'src/users/dto/password-user.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService, // để lấy ra data của .env
    private rolesService: RolesService,
    private mailService: MailService,
  ) {}

  // username, pass la 2 tham so la Passport nem ve
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user) {
      // neu dung email va co user co ton tai
      const isValid = this.usersService.isValidPassword(pass, user.password);
      if (isValid === true) {
        const userRole = user.role as unknown as { _id: string; name: string }; // cast objectId to role object
        const temp = await this.rolesService.findOne(userRole._id); // fetch role co chua permissions

        const objUser = {
          ...user.toObject(), // model => js object
          permissions: temp?.permissions ?? [], // gan them permission
        };

        return objUser;
      }
    }
    return null;
  }

  async login(user: IUser, response: Response) {
    const { _id, name, email, role, permissions } = user;
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
      maxAge: ms(this.configService.get<string>('JWT_REFRESH_EXPIRE')), //milisecond
    });

    // response
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        _id,
        name,
        email,
        role,
        permissions,
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

  processNewToken = async (refreshToken: string, response: Response) => {
    try {
      // verify: xác thực và decode refresh token luôn
      this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      });
      // tìm user theo refresh token => update refresh token
      let user = await this.usersService.findUserByToken(refreshToken);
      if (user) {
        const { _id, name, email, role } = user; // user: Model => _id: ObjectId // role: ObjectId
        const payload = {
          sub: 'token refresh',
          iss: 'from server',
          _id,
          name,
          email,
          role,
        };
        const refresh_token = this.createRefreshToken(payload);

        // update user with refresh token
        await this.usersService.updateUserToken(refresh_token, _id.toString());

        // fetch user's role
        const userRole = user.role as unknown as { _id: string; name: string }; // cast ObjectID => {...}
        const temp = await this.rolesService.findOne(userRole._id);

        // set refresh_token as cookies at client
        response.clearCookie('refresh_token');
        response.cookie('refresh_token', refresh_token, {
          httpOnly: true,
          maxAge: ms(this.configService.get<string>('JWT_REFRESH_EXPIRE')), //milisecond
        });

        // response
        return {
          access_token: this.jwtService.sign(payload),
          user: {
            _id,
            name,
            email,
            role,
            permissions: temp?.permissions ?? [],
          },
        };
      } else {
        throw new BadRequestException(
          `Refresh token không hợp lệ. Vui lòng login`,
        );
      }
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

  async logout(user: IUser, response: Response) {
    await this.usersService.updateUserToken('', user._id);
    response.clearCookie('refresh_token');
    return 'done';
    // update server: refresh token = null/ empty
    // update client:  clear refresh_token as cookies
  }

  async forgotPassword(userDto: ForgotPassUserDto) {
    // find user by email
    const user = await this.usersService.findOneByUsername(userDto.email);
    // validate
    if (!user) {
      throw new BadRequestException(
        `Not found user with email=${userDto.email}`,
      );
    }
    // dynamic generate new password
    const generator = require('generate-password');
    const newPass = generator.generate({
      length: 10,
      numbers: true,
    });
    console.log(newPass);
    // update new password
    const updateUser = await this.usersService.updatePassword(
      user._id,
      newPass,
      user,
    );
    // send mail
    if (updateUser.modifiedCount == 1) {
      this.mailService.sendNewPassword(user, newPass);
    }
    return updateUser;
  }
}
