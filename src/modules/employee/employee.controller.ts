import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { Employee } from '@prisma/client';

import { EmployeeService } from './employee.service';

import { EmployeeDto } from '@ds-dtos/employee.dto';
import { ApiResponseType } from '@ds-common/types/api-response.type';
import { SelectFieldsDto } from '@ds-dtos/select-fields.dto';
import { buildSelectObject } from '@ds-common/helpers/build-select-object.helper';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  public async create(
    @Body() employeeDto: EmployeeDto,
  ): Promise<ApiResponseType<Employee>> {
    const employee = await this.employeeService.create(employeeDto);

    return { data: employee };
  }

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

    const equipament = await this.employeeService.findById(id, select);

    return { data: equipament };
  }
}
