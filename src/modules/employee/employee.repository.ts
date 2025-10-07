import { Employee, Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '@ds-common/services/prisma/prisma.service';
import { EmployeeDto } from '@ds-dtos/employee.dto';

@Injectable()
export class EmployeeRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(employee: EmployeeDto): Promise<Employee> {
    return await this.prisma.employee.create({ data: employee });
  }

  public async findByCpf<T extends Prisma.EmployeeSelect>(
    cpf: string,
    select?: T,
    active = true,
  ): Promise<Prisma.EmployeeGetPayload<{ select: T }> | null> {
    return this.prisma.employee.findUnique({
      where: { cpf, active },
      select,
    });
  }

  public async findByEmail<T extends Prisma.EmployeeSelect>(
    email: string,
    select?: T,
    active = true,
  ): Promise<Prisma.EmployeeGetPayload<{ select: T }> | null> {
    return this.prisma.employee.findUnique({
      where: { email, active },
      select,
    });
  }

  public async findById<T extends Prisma.EmployeeSelect>(
    id: number,
    select?: T,
    active = true,
  ): Promise<Prisma.EmployeeGetPayload<{ select: T }> | null> {
    return this.prisma.employee.findUnique({
      where: { id, active },
      select,
    });
  }

  public async findAll<T extends Prisma.EmployeeSelect>(
    skip: number,
    limit: number,
    where: Prisma.EmployeeWhereInput = {},
    select?: T,
  ): Promise<Prisma.EmployeeGetPayload<{ select: T }>[] | null> {
    return this.prisma.employee.findMany({
      where,
      skip,
      take: limit,
      select,
    });
  }

  public async update(
    id: number,
    employee: Partial<Employee>,
  ): Promise<Employee> {
    return this.prisma.employee.update({
      where: { id },
      data: employee,
    });
  }
}
