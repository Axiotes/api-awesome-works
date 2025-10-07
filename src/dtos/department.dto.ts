import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class DepartmentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(3)
  abbreviation: string;
}
