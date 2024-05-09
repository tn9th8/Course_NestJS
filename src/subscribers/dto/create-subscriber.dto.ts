import {
  IsArray,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import mongoose from 'mongoose';

export class CreateSubscriberDto {
  @IsNotEmpty({ message: 'skills không được để trống' })
  @IsMongoId({ each: true, message: 'skills phải là mongo object id' })
  @IsArray({ message: 'skills có định dạng là array' })
  skills: mongoose.Schema.Types.ObjectId[];
}
