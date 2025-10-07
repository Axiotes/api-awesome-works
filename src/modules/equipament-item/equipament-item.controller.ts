import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EquipamentItem } from '@prisma/client';

import { EquipamentItemService } from './equipament-item.service';

import { EquipamentItemDto } from '@ds-dtos/equipament-item.dto';
import { ApiResponseType } from '@ds-common/types/api-response.type';
import { SelectFieldsDto } from '@ds-dtos/select-fields.dto';
import { buildSelectObject } from '@ds-common/helpers/build-select-object.helper';

@Controller('equipament-item')
export class EquipamentItemController {
  constructor(private readonly equipamentItemService: EquipamentItemService) {}

  @ApiOperation({
    summary: 'Cadastra um novo item de equipamento',
    description:
      'Este endpoint permite criar um novo item de equipamento no sistema.',
  })
  @ApiResponse({
    status: 201,
    description: 'Item de equipamento criado com sucesso',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            serialNumber: { type: 'string' },
            imei: { type: 'string' },
            equipamentId: { type: 'string' },
            employeeId: { type: 'string' },
            status: { type: 'string' },
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
    description: 'Equipamento com o mesmo número de série já existe',
    schema: {
      type: 'object',
      properties: {
        message: {
          example:
            'Equipament Item with the serial number "XXXXXX" already exists',
        },
        error: { example: 'Conflict' },
        statusCode: { example: 409 },
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Equipamento com o mesmo IMEI já existe',
    schema: {
      type: 'object',
      properties: {
        message: {
          example: 'Equipament Item with the IMEI "XXXXXX" already exists',
        },
        error: { example: 'Conflict' },
        statusCode: { example: 409 },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Equipamento com ID inexistente ou desativado',
    schema: {
      type: 'object',
      properties: {
        message: {
          example: 'Equipament with ID "X" not found',
        },
        error: { example: 'Not Found' },
        statusCode: { example: 404 },
      },
    },
  })
  @Post()
  public async create(
    @Body() equipamentItemDto: EquipamentItemDto,
  ): Promise<ApiResponseType<EquipamentItem>> {
    const equipamentItem =
      await this.equipamentItemService.create(equipamentItemDto);

    return { data: equipamentItem };
  }

  @ApiOperation({
    summary: 'Busca um item de equipamento pelo ID',
    description:
      'Este endpoint permite a busca de um item de equipamento pelo seu ID. Sendo possível selecionar campos específicos para retorno.',
  })
  @ApiResponse({
    status: 200,
    description: 'Busca realizada com sucesso',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            serialNumber: { type: 'string' },
            imei: { type: 'string' },
            equipamentId: { type: 'string' },
            employeeId: { type: 'string' },
            status: { type: 'string' },
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
    status: 404,
    description: 'Item de equipamento não encontrado',
    schema: {
      type: 'object',
      properties: {
        message: { example: 'Equipament Item with ID "X" not found' },
        error: { example: 'Not Found' },
        statusCode: { example: 404 },
      },
    },
  })
  @Get(':id')
  public async findById(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: SelectFieldsDto,
  ): Promise<ApiResponseType<EquipamentItem>> {
    const fields = query.fields ?? [];
    const allowed = [
      'id',
      'serialNumber',
      'imei',
      'equipamentId',
      'employeeId',
      'status',
      'active',
      'created_at',
      'updated_at',
      'deleted_at',
    ];

    const select = buildSelectObject(fields, allowed);

    const equipament = await this.equipamentItemService.findById(id, select);

    return { data: equipament };
  }
}
