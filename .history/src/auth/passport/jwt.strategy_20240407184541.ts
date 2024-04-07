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
      // lấy access token trong request header và decode
    });
  }

  async validate(payload: IUser) {
    // payload được lấy từ token đã giải mã +gán vào req.user
    const { _id, name, email, role } = payload;
    return {
      _id,
      name,
      email,
      role,
    };
  }
}
