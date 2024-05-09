import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';

export class ProfileUserDto extends OmitType(CreateUserDto, [
  'email',
  'password',
  'role',
  'company',
] as const) {}
// PartialType(CreateUserDto): kế thừa toàn bộ thuộc tính
// OmitType(CreateUserDto, ['name'] as const): bỏ thuộc tính
