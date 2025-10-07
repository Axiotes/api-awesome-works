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
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EquipamentItem } from '@prisma/client';

import { EquipamentItemService } from './equipament-item.service';

import { EquipamentItemDto } from '@ds-dtos/equipament-item.dto';
import { ApiResponseType } from '@ds-common/types/api-response.type';
import { SelectFieldsDto } from '@ds-dtos/select-fields.dto';
import { buildSelectObject } from '@ds-common/helpers/build-select-object.helper';
import { FindAllEquipamentItemDto } from '@ds-dtos/find-all-equipament-itens.dto';
import { UpdateEquipamentItemDto } from '@ds-dtos/update-equipament-item.dto';

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

  @ApiOperation({
    summary: 'Listagem de itens de equipamento',
    description:
      'Este endpoint permite listar todos os itens de equipamento. Sendo possível utilizar paginação, filtros e selecionar campos específicos para retorno.',
  })
  @ApiResponse({
    status: 200,
    description: 'Listagem realizada com sucesso',
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
  @Get()
  public async findAll(
    @Query() query: FindAllEquipamentItemDto,
  ): Promise<ApiResponseType<EquipamentItem[]>> {
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

    const equipaments = await this.equipamentItemService.findAll(query, select);

    return {
      data: equipaments,
      pagination: { skip: query.skip, limit: query.limit },
      total: equipaments.length,
    };
  }

  @ApiOperation({
    summary: 'Atualizar um item de equipamento',
    description:
      'Este endpoint permite atualizar um item equipamento no sistema.',
  })
  @ApiResponse({
    status: 200,
    description: 'Equipamento atualizado com sucesso',
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
  @Patch(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEquipamentDto: UpdateEquipamentItemDto,
  ): Promise<ApiResponseType<EquipamentItem>> {
    const equipament = await this.equipamentItemService.update(
      id,
      updateEquipamentDto,
    );

    return { data: equipament };
  }

  @ApiOperation({
    summary: 'Desativar um item equipamento',
    description:
      'Este endpoint permite desativar um item equipamento no sistema',
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
    description: 'Item de equipamento não encontrado ou já está desativado',
    schema: {
      type: 'object',
      properties: {
        message: {
          example: 'Equipament Item with non-existent or disabled "X" ID',
        },
        error: { example: 'Not Found' },
        statusCode: { example: 404 },
      },
    },
  })
  @Patch('deactivate/:id')
  public async deactivate(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponseType<EquipamentItem>> {
    const equipament = await this.equipamentItemService.deactivate(id);

    return { data: equipament };
  }

  @ApiOperation({
    summary: 'Reativar um item de equipamento',
    description:
      'Este endpoint permite reativar um item equipamento no sistema',
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
    description: 'Item de equipamento não encontrado ou já está ativo',
    schema: {
      type: 'object',
      properties: {
        message: {
          example: 'Equipament Item with non-existent or activated "X" ID',
        },
        error: { example: 'Not Found' },
        statusCode: { example: 404 },
      },
    },
  })
  @Patch('reactivate/:id')
  public async reactivate(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponseType<EquipamentItem>> {
    const equipament = await this.equipamentItemService.reactivate(id);

    return { data: equipament };
  }

  @ApiOperation({
    summary: 'Alocar um item de equipamento para um colaborador',
    description:
      'Este endpoint permite registrar alocação de um item equipamento para um colaborador no sistema',
  })
  @ApiResponse({
    status: 200,
    description: 'Alocado com sucesso',
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
    description: 'Item de equipamento já alocado',
    schema: {
      type: 'object',
      properties: {
        message: {
          example: 'Equipament Item with ID "X" is already allocated',
        },
        error: { example: 'Conflict' },
        statusCode: { example: 409 },
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Item de equipamento em manutenção',
    schema: {
      type: 'object',
      properties: {
        message: {
          example: 'Equipament Item with ID "X" is in maintenance',
        },
        error: { example: 'Conflict' },
        statusCode: { example: 409 },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Id do colaborador não encontrado ou inativo',
    schema: {
      type: 'object',
      properties: {
        message: {
          example: 'Employee with ID "X" not found',
        },
        error: { example: 'Not Found' },
        statusCode: { example: 404 },
      },
    },
  })
  @Patch('allocate/:id/employee/:employeeId')
  public async allocate(
    @Param('id', ParseIntPipe) id: number,
    @Param('employeeId', ParseIntPipe) employeeId: number,
  ): Promise<ApiResponseType<EquipamentItem>> {
    const equipament = await this.equipamentItemService.allocate(
      id,
      employeeId,
    );

    return { data: equipament };
  }
}
