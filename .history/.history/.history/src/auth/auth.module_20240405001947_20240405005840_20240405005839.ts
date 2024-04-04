import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './passport/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './passport/jwt.strategy';
import { Reflector } from '@nestjs/core';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    // JwtModule.({
    //   secret: jwtConstants.secret,
    //   signOptions: { expiresIn: '60s' },
    // }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_TOKEN'),
        signOptions: {
          expiresIn: ms(configService.get<string>('JWT_EXPIRE')),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    ConfigService,
    // Reflector,
  ],
  exports: [AuthService],
})
export class AuthModule {}
