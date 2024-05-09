import { IsNotEmpty } from 'class-validator';

export class GetSkillByNameDto {
  @IsNotEmpty({ message: 'Name không được để trống' })
  name: string;
}
