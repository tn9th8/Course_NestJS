import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto extends OmitType(CreateUserDto, [
  'password',
] as const) {
  @IsNotEmpty({ message: '_id không được để trống' })
  _id: string;
}
// PartialType(CreateUserDto): kế thừa toàn bộ thuộc tính
// OmitType(CreateUserDto, ['name'] as const): bỏ thuộc tính
