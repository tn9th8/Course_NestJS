import { IsNotEmpty } from "class-validator";

export class ChangePassUserDto {
    @IsNotEmpty({ message: '_id không được để trống' })
    _id: string;

    @IsNotEmpty({ message: 'Current Password không được để trống' })
    currentPass: string;

    @IsNotEmpty({ message: 'New Password không được để trống' })
    newPass: string;
  }