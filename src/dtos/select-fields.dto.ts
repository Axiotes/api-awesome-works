import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsOptional, ArrayNotEmpty, IsString } from 'class-validator';

export class SelectFieldsDto {
  @ApiProperty({
    description: 'Campos a serem retornados na resposta',
    example: 'id,active',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === undefined || value === null) return undefined;
    if (Array.isArray(value))
      return value.map((v) => String(v).trim()).filter(Boolean);
    if (typeof value === 'string')
      return value
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    return value;
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  fields?: string[];
}
