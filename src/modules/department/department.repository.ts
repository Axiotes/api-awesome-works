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
}
