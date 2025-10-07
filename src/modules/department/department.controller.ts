import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Department } from '@prisma/client';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { DepartmentService } from './department.service';

import { DepartmentDto } from '@ds-dtos/department.dto';
import { ApiResponseType } from '@ds-common/types/api-response.type';
import { SelectFieldsDto } from '@ds-dtos/select-fields.dto';
import { buildSelectObject } from '@ds-common/helpers/build-select-object.helper';
import { FindAllDepartmentDto } from '@ds-dtos/find-all-departments.dto';
import { UpdateDepartmentDto } from '@ds-dtos/update-department.dto';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @ApiOperation({
    summary: 'Cadastra um novo setor',
    description: 'Este endpoint permite criar um novo setor no sistema.',
  })
  @ApiResponse({
    status: 201,
    description: 'Setor criado com sucesso',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            abbreviation: { type: 'string' },
            active: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time', nullable: true },
            deletedAt: { type: 'string', format: 'date-time', nullable: true },
          },
        },
      },
    },
  })
  @Post()
  public async create(
    @Body() departmentDto: DepartmentDto,
  ): Promise<ApiResponseType<Department>> {
    const department = await this.departmentService.create(departmentDto);

    return { data: department };
  }

  @ApiOperation({
    summary: 'Busca um setor pelo ID',
    description:
      'Este endpoint permite a busca de um setor pelo seu ID. Sendo possível selecionar campos específicos para retorno.',
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
            abbreviation: { type: 'string' },
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
    description: 'Setor não encontrado',
    schema: {
      type: 'object',
      properties: {
        message: { example: 'Department with ID "X" not found' },
        error: { example: 'Not Found' },
        statusCode: { example: 404 },
      },
    },
  })
  @Get(':id')
  public async findById(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: SelectFieldsDto,
  ): Promise<ApiResponseType<Department>> {
    const fields = query.fields ?? [];
    const allowed = [
      'id',
      'name',
      'abbreviation',
      'active',
      'created_at',
      'updated_at',
      'deleted_at',
    ];

    const select = buildSelectObject(fields, allowed);

    const department = await this.departmentService.findById(id, select);

    return { data: department };
  }

  @ApiOperation({
    summary: 'Listagem de setores',
    description:
      'Este endpoint permite listar todos os setores. Sendo possível utilizar paginação, filtros e selecionar campos específicos para retorno.',
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
            abbreviation: { type: 'string' },
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
    @Query() query: FindAllDepartmentDto,
  ): Promise<ApiResponseType<Department[]>> {
    const fields = query.fields ?? [];
    const allowed = [
      'id',
      'name',
      'abbreviation',
      'active',
      'created_at',
      'updated_at',
      'deleted_at',
    ];

    const select = buildSelectObject(fields, allowed);

    const department = await this.departmentService.findAll(query, select);

    return {
      data: department,
      pagination: { skip: query.skip, limit: query.limit },
      total: department.length,
    };
  }

  @ApiOperation({
    summary: 'Atualizar um setor',
    description: 'Este endpoint permite atualizar um setor no sistema.',
  })
  @ApiResponse({
    status: 200,
    description: 'Setor atualizado com sucesso',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            abbreviation: { type: 'string' },
            active: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time', nullable: true },
            deletedAt: { type: 'string', format: 'date-time', nullable: true },
          },
        },
      },
    },
  })
  @Patch(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<ApiResponseType<Department>> {
    const department = await this.departmentService.update(
      id,
      updateDepartmentDto,
    );

    return { data: department };
  }

  @Patch('deactivate/:id')
  public async deactivate(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponseType<Department>> {
    const department = await this.departmentService.deactivate(id);

    return { data: department };
  }

  @Patch('reactivate/:id')
  public async reactivate(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponseType<Department>> {
    const department = await this.departmentService.reactivate(id);

    return { data: department };
  }
}
