import { IsArray, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateSubscriberDto {
  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsEmail({}, { message: 'Email phải đúng định dạng' })
  email: string;

  @IsNotEmpty({ message: 'Name không được để trống' })
  name: string;

  @IsNotEmpty({ message: 'skills không được để trống' })
  @IsArray({ message: 'skills có định dạng là array' })
  skills: string[];
}
