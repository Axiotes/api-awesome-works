import { Body, Controller, Post } from '@nestjs/common';
import { Department } from '@prisma/client';

import { DepartmentService } from './department.service';

import { DepartmentDto } from '@ds-dtos/department.dto';
import { ApiResponseType } from '@ds-common/types/api-response.type';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  public async create(
    @Body() equipamentDto: DepartmentDto,
  ): Promise<ApiResponseType<Department>> {
    const equipament = await this.departmentService.create(equipamentDto);

    return { data: equipament };
  }
}
