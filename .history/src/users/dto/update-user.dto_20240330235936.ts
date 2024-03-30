import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends OmitType(CreateUserDto, [
  'password',
] as const) {
  _id: string;
}
// PartialType(CreateUserDto): kế thừa toàn bộ thuộc tính
// OmitType(CreateUserDto, ['name'] as const): bỏ thuộc tính
