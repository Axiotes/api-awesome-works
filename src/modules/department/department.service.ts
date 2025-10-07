import { Injectable } from '@nestjs/common';
import { Department } from '@prisma/client';

import { DepartmentRepository } from './department.repository';

import { DepartmentDto } from '@ds-dtos/department.dto';

@Injectable()
export class DepartmentService {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  public async create(department: DepartmentDto): Promise<Department> {
    return await this.departmentRepository.create(department);
  }
}
