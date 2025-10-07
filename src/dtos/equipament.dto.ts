import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, Length } from 'class-validator';

export class EquipamentDto {
  @ApiProperty({
    description: 'Nome do equipamento',
    example: 'Lenovo ThinkPad E14',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'Prefixo do equipamento',
    example: 'NB',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 3)
  prefix: string;

  @ApiProperty({
    description: 'Categoria do equipamento',
    example: 'Notebook',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  category: string;

  @ApiProperty({
    description: 'Marca do equipamento',
    example: 'Lenovo',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  brand: string;
}
