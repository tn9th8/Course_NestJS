import { IsEmail, IsNotEmpty } from 'class-validator';

export class ChangePassUserDto {
  @IsNotEmpty({ message: 'Current Password không được để trống' })
  currentPass: string;

  @IsNotEmpty({ message: 'New Password không được để trống' })
  newPass: string;
}

export class ForgotPassUserDto {
  @IsEmail({}, { message: 'Email phải đúng định dạng' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;
}
