import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class FindEquipamentDto {
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  skip: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1)
  limit: number;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  active: boolean;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  prefix: string;

  @IsOptional()
  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  brand: string;
}
