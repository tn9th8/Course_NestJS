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
      // Passport requires some initialization: token trong request header + xin signature
      // Passport sau đó decode token
      // Passport auto gọi validate() để pass the decoded JSON as its single parameter
    });
  }

  async validate(payload: IUser) {
    const { _id, name, email, role } = payload;
    return {
      _id,
      name,
      email,
      role,
    };
  }
}
