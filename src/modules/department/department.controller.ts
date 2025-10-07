import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { Department } from '@prisma/client';

import { DepartmentService } from './department.service';

import { DepartmentDto } from '@ds-dtos/department.dto';
import { ApiResponseType } from '@ds-common/types/api-response.type';
import { SelectFieldsDto } from '@ds-dtos/select-fields.dto';
import { buildSelectObject } from '@ds-common/helpers/build-select-object.helper';

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
}
