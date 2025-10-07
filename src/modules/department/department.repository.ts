import { Injectable } from '@nestjs/common';
import { Department, Prisma } from '@prisma/client';

import { PrismaService } from '@ds-common/services/prisma/prisma.service';
import { DepartmentDto } from '@ds-dtos/department.dto';

@Injectable()
export class DepartmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(department: DepartmentDto): Promise<Department> {
    return await this.prisma.department.create({ data: department });
  }

  public async findById<T extends Prisma.DepartmentSelect>(
    id: number,
    select?: T,
    active = true,
  ): Promise<Prisma.DepartmentGetPayload<{ select: T }> | null> {
    return this.prisma.department.findUnique({
      where: { id, active },
      select,
    });
  }

  public async findAll<T extends Prisma.DepartmentSelect>(
    skip: number,
    limit: number,
    where: Prisma.DepartmentWhereInput = {},
    select?: T,
  ): Promise<Prisma.DepartmentGetPayload<{ select: T }>[] | null> {
    return this.prisma.department.findMany({
      where,
      skip,
      take: limit,
      select,
    });
  }

  public async update(
    id: number,
    department: Partial<Department>,
  ): Promise<Department> {
    return this.prisma.department.update({
      where: { id },
      data: department,
    });
  }
}
