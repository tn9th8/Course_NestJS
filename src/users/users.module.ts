import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { RolesModule } from 'src/roles/roles.module';
import { Role, RoleSchema } from 'src/roles/schemas/role.schemas';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, ConfigService],
  exports: [UsersService],
})
export class UsersModule {}
