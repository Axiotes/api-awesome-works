import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  MaxLength,
  Min,
} from 'class-validator';

export class EmployeeDto {
  @ApiProperty({
    description: 'Nome do colaborador',
    example: 'Arthur Axiotes',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name: string;

  @ApiProperty({
    description: 'CPF do colaborador',
    example: '12345678901',
  })
  @IsString()
  @Length(11, 11)
  cpf: string;

  @ApiProperty({
    description: 'Email do colaborador',
    example: 'arthur@gmail.com',
  })
  @MaxLength(100)
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Cargo do colaborador',
    example: 'Desenvolvedor',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  jobTitle: string;

  @ApiProperty({
    description: 'Id do setor do colaborador',
    example: '3',
  })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1)
  departmentId: number;
}
