import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  isBoolean,
} from 'class-validator';
import mongoose from 'mongoose';

export class CreateRoleDto {
  @IsNotEmpty({ message: 'name không được để trống' })
  name: string;

  @IsNotEmpty({ message: 'description không được để trống' })
  description: string;

  @IsNotEmpty({ message: 'isActive không được để trống' })
  @IsBoolean({ message: 'isActive ccó giá trị boolean' })
  isActive: boolean;

  @IsNotEmpty({ message: 'permissions không được để trống' })
  @IsMongoId({ each: true, message: 'permissions phải là mongo object id' })
  @IsArray({ message: 'permissions phải là list array' })
  permissions: mongoose.Schema.Types.ObjectId[];
}
