import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class FindEquipamentDto {
  @ApiProperty({ description: 'Número de documentos que serão pulados' })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  skip: number;

  @ApiProperty({ description: 'Número de documentos que serão retornados' })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1)
  limit: number;

  @ApiProperty({
    description: 'Filtro por status do equipamento',
    example: 'true',
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  active?: boolean;

  @ApiProperty({
    description: 'Filtro por nome do equipamento',
    example: 'Lenovo ThinkPad E14',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Filtro por prefixo do equipamento',
    example: 'NB',
  })
  @IsOptional()
  @IsString()
  prefix?: string;

  @ApiProperty({
    description: 'Filtro por categoria do equipamento',
    example: 'Notebook',
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({
    description: 'Filtro marca do equipamento',
    example: 'Lenovo',
  })
  @IsOptional()
  @IsString()
  brand?: string;
}
