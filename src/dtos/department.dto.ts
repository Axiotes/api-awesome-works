import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class DepartmentDto {
  @ApiProperty({
    description: 'Nome do setor',
    example: 'Recursos Humanos',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    description: 'Abreviação do equipamento',
    example: 'RH',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(3)
  abbreviation: string;
}
