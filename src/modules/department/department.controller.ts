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

  @Post()
  public async create(
    @Body() departmentDto: DepartmentDto,
  ): Promise<ApiResponseType<Department>> {
    const department = await this.departmentService.create(departmentDto);

    return { data: department };
  }

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
