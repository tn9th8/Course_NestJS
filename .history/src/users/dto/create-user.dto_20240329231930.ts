import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail
  email: string;
  password: string;
  name: string;
  address: string;
}
