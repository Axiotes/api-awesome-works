import { Injectable, NotFoundException } from '@nestjs/common';
import { Department, Prisma } from '@prisma/client';

import { DepartmentRepository } from './department.repository';

import { DepartmentDto } from '@ds-dtos/department.dto';
import { FindDepartmentDto } from '@ds-dtos/find-department.dto';

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

  public async findAll(
    findDepartmentDto: FindDepartmentDto,
    select?: Prisma.DepartmentSelect,
  ): Promise<Department[]> {
    let where = {};

    const filters: { [K in keyof FindDepartmentDto]?: () => void } = {
      active: () => (where = { ...where, active: findDepartmentDto.active }),
      name: () =>
        (where = {
          ...where,
          name: { contains: findDepartmentDto.name, mode: 'insensitive' },
        }),
      abbreviation: () =>
        (where = {
          ...where,
          prefix: {
            contains: findDepartmentDto.abbreviation,
            mode: 'insensitive',
          },
        }),
    };

    for (const key in findDepartmentDto) {
      if (key === 'skip' || key === 'limit') continue;

      const func = filters[key];

      if (func) func();
    }

    return await this.departmentRepository.findAll(
      findDepartmentDto.skip,
      findDepartmentDto.limit,
      where,
      select,
    );
  }
}
