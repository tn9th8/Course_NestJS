import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUser } from 'src/users/users.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // Strategy là thư viện xử lý token như encode, decode

  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
      // This strategy requires some initialization: token in token trong request header + xin chữ ký
      // Passport sau đó decode token
      // Passport auto gọi validate() để pass payload
    });
  }

  async validate(payload: IUser) {
    //decode access token => lấy ra payload => gán vào req.user
    const { _id, name, email, role } = payload;
    return {
      _id,
      name,
      email,
      role,
    };
  }
}
