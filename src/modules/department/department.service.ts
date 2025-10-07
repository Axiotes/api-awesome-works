import { Injectable, NotFoundException } from '@nestjs/common';
import { Department, Prisma } from '@prisma/client';

import { DepartmentRepository } from './department.repository';

import { DepartmentDto } from '@ds-dtos/department.dto';
import { FindDepartmentDto } from '@ds-dtos/find-department.dto';
import { UpdateDepartmentDto } from '@ds-dtos/update-department.dto';

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
          abbreviation: {
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

  public async update(
    id: number,
    updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<Department> {
    const department = await this.findById(id);

    const updatedAt = new Date();
    const departmentUpdates = {
      id,
      name: updateDepartmentDto.name ?? department.name,
      abbreviation: updateDepartmentDto.abbreviation ?? department.abbreviation,
      active: department.active,
      createdAt: department.createdAt,
      updatedAt,
      deletedAt: department.deletedAt,
    };

    return await this.departmentRepository.update(id, departmentUpdates);
  }

  public async deactivate(id: number): Promise<Department> {
    const department = await this.departmentRepository.findById(id, {
      id: true,
    });

    if (!department) {
      throw new NotFoundException(
        `Department with non-existent or disabled "${id}" ID`,
      );
    }

    const deletedAt = new Date();

    const departmentUpdates = { ...department, active: false, deletedAt };

    return await this.departmentRepository.update(id, departmentUpdates);
  }

  public async reactivate(id: number): Promise<Department> {
    const department = await this.departmentRepository.findById(
      id,
      {
        id: true,
      },
      false,
    );

    if (!department) {
      throw new NotFoundException(
        `Department with non-existent or activated "${id}" ID`,
      );
    }

    const deletedAt = null;

    const departmentUpdates = { ...department, active: true, deletedAt };

    return await this.departmentRepository.update(id, departmentUpdates);
  }
}
