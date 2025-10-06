import { IsString, IsNotEmpty, MaxLength, Length } from 'class-validator';

export class EquipamentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 3)
  prefix: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  category: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  brand: string;
}
