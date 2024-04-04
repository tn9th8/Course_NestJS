import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // Strategy là thư viện xử lý token như encode, decode

  constructor(private configService: ConfigService) {
    // lấy jwt trong request
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    // giải mã payload trong jwt
    return {
      userId: payload.sub,
      username: payload.username,
      name: 'hoi dan it',
    };
  }
}
