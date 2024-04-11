import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUser } from 'src/users/users.interface';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // Strategy là thư viện xử lý token như encode, decode

  constructor(
    private configService: ConfigService,
    private rolesService: RolesService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
      // Passport requires some initialization: token trong request header + xin signature
      // Passport sau đó decode token (decode token in super())
      // Passport auto gọi validate() để pass the decoded JSON as its single parameter và gán vào req.user
    });
  }

  async validate(payload: IUser) {
    const { _id, name, email, role } = payload;

    // cần gán thêm permissions vào req.user
    const userRole = role as unknown as { _id: string; name: string }; // cast objectId to role object
    const temp = (await this.rolesService.findOne(userRole._id)).toObject(); // fetch role co chua permissions

    return {
      _id,
      name,
      email,
      role,
      permissions: temp?.permissions ?? [],
    };
  }
}
