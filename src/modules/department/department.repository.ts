import { Injectable } from '@nestjs/common';
import { Department } from '@prisma/client';

import { PrismaService } from '@ds-common/services/prisma/prisma.service';
import { DepartmentDto } from '@ds-dtos/department.dto';

@Injectable()
export class DepartmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(department: DepartmentDto): Promise<Department> {
    return await this.prisma.department.create({ data: department });
  }
}
