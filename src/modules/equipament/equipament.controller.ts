import { Body, Controller, Post } from '@nestjs/common';
import { Equipament } from '@prisma/client';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { EquipamentService } from './equipament.service';

import { EquipamentDto } from '@ds-dtos/equipament.dto';
import { ApiResponseType } from '@ds-common/types/api-response.type';

@Controller('equipament')
export class EquipamentController {
  constructor(private readonly equipamentService: EquipamentService) {}

  @ApiOperation({
    summary: 'Cadastra um novo equipamento',
    description: 'Este endpoint permite criar um novo equipamento no sistema.',
  })
  @ApiResponse({
    status: 201,
    description: 'Equipamento criado com sucesso',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            prefix: { type: 'string' },
            category: { type: 'string' },
            brand: { type: 'string' },
            active: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time', nullable: true },
            deletedAt: { type: 'string', format: 'date-time', nullable: true },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Equipamento com o mesmo nome já existe',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        error: { type: 'string' },
        statusCode: { type: 'number' },
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Equipamento com o mesmo nome já existe',
  })
  @Post()
  public async create(
    @Body() equipamentDto: EquipamentDto,
  ): Promise<ApiResponseType<Equipament>> {
    const equipament = await this.equipamentService.create(equipamentDto);

    return { data: equipament };
  }
}
