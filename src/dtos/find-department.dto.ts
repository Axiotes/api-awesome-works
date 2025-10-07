import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class FindDepartmentDto {
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
    description: 'Filtro por status do setor',
    example: 'true',
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  active?: boolean;

  @ApiProperty({
    description: 'Filtro por nome do setor',
    example: 'Recursos Humanos',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Filtro por abrivação do setor',
    example: 'RH',
  })
  @IsOptional()
  @IsString()
  abbreviation?: string;
}
