import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { Equipament } from '@prisma/client';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { EquipamentService } from './equipament.service';

import { EquipamentDto } from '@ds-dtos/equipament.dto';
import { ApiResponseType } from '@ds-common/types/api-response.type';
import { SelectFieldsDto } from '@ds-dtos/select-fields.dto';
import { buildSelectObject } from '@ds-common/helpers/build-select-object.helper';
import { FindAllEquipamentDto } from '@ds-dtos/find-all-equipaments.dto';

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
        message: { example: 'Equipment with the name "XXXXX" already exists' },
        error: { example: 'Conflict' },
        statusCode: { example: 409 },
      },
    },
  })
  @Post()
  public async create(
    @Body() equipamentDto: EquipamentDto,
  ): Promise<ApiResponseType<Equipament>> {
    const equipament = await this.equipamentService.create(equipamentDto);

    return { data: equipament };
  }

  @ApiOperation({
    summary: 'Busca um equipamento pelo ID',
    description:
      'Este endpoint permite a busca de um equipamento pelo seu ID. Sendo possível selecionar campos específicos para retorno.',
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
    status: 404,
    description: 'Equipamento com o mesmo nome já existe',
    schema: {
      type: 'object',
      properties: {
        message: { example: 'Equipment with ID "X" not found' },
        error: { example: 'Not Found' },
        statusCode: { example: 404 },
      },
    },
  })
  @Get(':id')
  public async findById(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: SelectFieldsDto,
  ): Promise<ApiResponseType<Equipament>> {
    const fields = query.fields ?? [];
    const allowed = [
      'id',
      'name',
      'prefix',
      'category',
      'brand',
      'active',
      'created_at',
      'updated_at',
      'deleted_at',
    ];

    const select = buildSelectObject(fields, allowed);

    const equipament = await this.equipamentService.findById(id, select);

    return { data: equipament };
  }

  @ApiOperation({
    summary: 'Listagem de equipamentos',
    description:
      'Este endpoint permite listar todos os equipamentos. Sendo possível utilizar paginação, filtros e selecionar campos específicos para retorno.',
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
  @Get()
  public async findAll(
    @Query() query: FindAllEquipamentDto,
  ): Promise<ApiResponseType<Equipament[]>> {
    const fields = query.fields ?? [];
    const allowed = [
      'id',
      'name',
      'prefix',
      'category',
      'brand',
      'active',
      'created_at',
      'updated_at',
      'deleted_at',
    ];

    const select = buildSelectObject(fields, allowed);

    const equipaments = await this.equipamentService.findAll(query, select);

    return {
      data: equipaments,
      pagination: { skip: query.skip, limit: query.limit },
      total: equipaments.length,
    };
  }
}
