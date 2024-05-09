import { IsNotEmpty } from 'class-validator';

export class CreateSkillDto {
  @IsNotEmpty({ message: 'Name không được để trống' })
  name: string;

  @IsNotEmpty({ message: 'Description không được để trống' })
  description: string;
}
