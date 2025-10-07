import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class EquipamentItemDto {
  @ApiProperty({
    description: 'Número de série',
    example: '00000001',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  serialNumber: string;

  @ApiProperty({
    description: 'IMEI',
    example: '490154203237518',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  imei: string;

  @ApiProperty({
    description: 'Id do equipamento',
    example: '3',
  })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1)
  equipamentId: number;
}
