import { Injectable, NotFoundException } from '@nestjs/common';
import { Department, Prisma } from '@prisma/client';

import { DepartmentRepository } from './department.repository';

import { DepartmentDto } from '@ds-dtos/department.dto';

@Injectable()
export class DepartmentService {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  public async create(department: DepartmentDto): Promise<Department> {
    return await this.departmentRepository.create(department);
  }

  public async findById(
    id: number,
    select?: Prisma.DepartmentSelect,
  ): Promise<Department> {
    const department = await this.departmentRepository.findById(id, select);

    if (!department) {
      throw new NotFoundException(`Department with ID "${id}" not found`);
    }

    return department;
  }
}
