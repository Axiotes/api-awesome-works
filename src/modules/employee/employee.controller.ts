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
import { Employee } from '@prisma/client';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { EmployeeService } from './employee.service';

import { EmployeeDto } from '@ds-dtos/employee.dto';
import { ApiResponseType } from '@ds-common/types/api-response.type';
import { SelectFieldsDto } from '@ds-dtos/select-fields.dto';
import { buildSelectObject } from '@ds-common/helpers/build-select-object.helper';
import { FindAllEmployeeDto } from '@ds-dtos/find-all-employee.dto';
import { UpdateEmployeeDto } from '@ds-dtos/update-employee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @ApiOperation({
    summary: 'Cadastra um novo colaborador',
    description: 'Este endpoint permite criar um novo colaborador no sistema.',
  })
  @ApiResponse({
    status: 201,
    description: 'Colaborador criado com sucesso',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            cpf: { type: 'string' },
            email: { type: 'string' },
            jobTitle: { type: 'string' },
            departmentId: { type: 'string' },
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
    description: 'Colaborador com o mesmo cpf já existe',
    schema: {
      type: 'object',
      properties: {
        message: { example: 'Employee with the cpf "XXXXX" already exists' },
        error: { example: 'Conflict' },
        statusCode: { example: 409 },
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Email com o mesmo email já existe',
    schema: {
      type: 'object',
      properties: {
        message: { example: 'Employee with the cpf "XXXXX" already exists' },
        error: { example: 'Conflict' },
        statusCode: { example: 409 },
      },
    },
  })
  @Post()
  public async create(
    @Body() employeeDto: EmployeeDto,
  ): Promise<ApiResponseType<Employee>> {
    const employee = await this.employeeService.create(employeeDto);

    return { data: employee };
  }

  @ApiOperation({
    summary: 'Busca um colaborador pelo ID',
    description:
      'Este endpoint permite a busca de um colaborador pelo seu ID. Sendo possível selecionar campos específicos para retorno.',
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
            cpf: { type: 'string' },
            email: { type: 'string' },
            jobTitle: { type: 'string' },
            departmentId: { type: 'string' },
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
    description: 'Colaborador não encontrado',
    schema: {
      type: 'object',
      properties: {
        message: { example: 'Employee with ID "X" not found' },
        error: { example: 'Not Found' },
        statusCode: { example: 404 },
      },
    },
  })
  @Get(':id')
  public async findById(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: SelectFieldsDto,
  ): Promise<ApiResponseType<Employee>> {
    const fields = query.fields ?? [];
    const allowed = [
      'id',
      'name',
      'cpf',
      'email',
      'jobTitle',
      'department',
      'active',
      'created_at',
      'updated_at',
      'deleted_at',
    ];

    const select = buildSelectObject(fields, allowed);

    const employee = await this.employeeService.findById(id, select);

    return { data: employee };
  }

  @ApiOperation({
    summary: 'Listagem de colaboradores',
    description:
      'Este endpoint permite listar todos os colaboradores. Sendo possível utilizar paginação, filtros e selecionar campos específicos para retorno.',
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
            cpf: { type: 'string' },
            email: { type: 'string' },
            jobTitle: { type: 'string' },
            departmentId: { type: 'string' },
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
    @Query() query: FindAllEmployeeDto,
  ): Promise<ApiResponseType<Employee[]>> {
    const fields = query.fields ?? [];
    const allowed = [
      'id',
      'name',
      'cpf',
      'email',
      'jobTitle',
      'department',
      'active',
      'created_at',
      'updated_at',
      'deleted_at',
    ];

    const select = buildSelectObject(fields, allowed);

    const employees = await this.employeeService.findAll(query, select);

    return {
      data: employees,
      pagination: { skip: query.skip, limit: query.limit },
      total: employees.length,
    };
  }

  @Patch(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<ApiResponseType<Employee>> {
    const employee = await this.employeeService.update(id, updateEmployeeDto);

    return { data: employee };
  }

  @ApiOperation({
    summary: 'Desativar um colaborador',
    description: 'Este endpoint permite desativar um colaborador no sistema',
  })
  @ApiResponse({
    status: 200,
    description: 'Desativado com sucesso',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            cpf: { type: 'string' },
            email: { type: 'string' },
            jobTitle: { type: 'string' },
            departmentId: { type: 'string' },
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
    description: 'Colaborador não encontrado ou já está desativado',
    schema: {
      type: 'object',
      properties: {
        message: { example: 'Employee with non-existent or disabled "X" ID' },
        error: { example: 'Not Found' },
        statusCode: { example: 404 },
      },
    },
  })
  @Patch('deactivate/:id')
  public async deactivate(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponseType<Employee>> {
    const employee = await this.employeeService.deactivate(id);

    return { data: employee };
  }

  @ApiOperation({
    summary: 'Reativar um colaborador',
    description: 'Este endpoint permite reativar um colaborador no sistema',
  })
  @ApiResponse({
    status: 200,
    description: 'Reativado com sucesso',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            cpf: { type: 'string' },
            email: { type: 'string' },
            jobTitle: { type: 'string' },
            departmentId: { type: 'string' },
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
    description: 'Colaborador não encontrado ou já está ativo',
    schema: {
      type: 'object',
      properties: {
        message: {
          example: 'Employee with non-existent or activated "X" ID',
        },
        error: { example: 'Not Found' },
        statusCode: { example: 404 },
      },
    },
  })
  @Patch('reactivate/:id')
  public async reactivate(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponseType<Employee>> {
    const employee = await this.employeeService.reactivate(id);

    return { data: employee };
  }
}
