import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

import { EquipamentItemStatusEnum } from '@ds-common/enum/equipament-item-status.enum';

export class FindEquipamentItemDto {
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
    description: 'Filtro por item ativo ou inativo',
    example: 'true',
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  active?: boolean;

  @ApiProperty({
    description: 'Filtro por número de série do item de equipamento',
    example: '0000001',
  })
  @IsOptional()
  @IsString()
  serialNumber?: string;

  @ApiProperty({
    description: 'Filtro por imei do item de equipamento',
    example: '490154203237518',
  })
  @IsOptional()
  @IsString()
  imei?: string;

  @ApiProperty({
    description: 'Filtro por id de equipamento',
    example: '2',
  })
  @IsOptional()
  @IsString()
  equipamentId?: string;

  @ApiProperty({
    description: 'Filtro por id de colaborador',
    example: '4',
  })
  @IsOptional()
  @IsString()
  employeeId?: string;

  @ApiProperty({
    description: 'Filtro por status do item de equipamento',
    example: '4',
  })
  @IsOptional()
  @IsEnum(EquipamentItemStatusEnum)
  status?: EquipamentItemStatusEnum;
}
