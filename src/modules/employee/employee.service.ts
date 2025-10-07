import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Employee, Prisma } from '@prisma/client';

import { EmployeeRepository } from './employee.repository';

import { EmployeeDto } from '@ds-dtos/employee.dto';

@Injectable()
export class EmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  public async create(employee: EmployeeDto): Promise<Employee> {
    const employeeCpf = await this.employeeRepository.findByCpf(employee.cpf, {
      cpf: true,
    });

    if (employeeCpf) {
      throw new ConflictException(
        `Employee with the CPF "${employee.cpf}" already exists`,
      );
    }

    const employeeEmail = await this.employeeRepository.findByEmail(
      employee.email,
      {
        email: true,
      },
    );

    if (employeeEmail) {
      throw new ConflictException(
        `Employee with the email "${employee.email}" already exists`,
      );
    }

    return await this.employeeRepository.create(employee);
  }

  public async findById(
    id: number,
    select?: Prisma.EmployeeSelect,
  ): Promise<Employee> {
    if (select && select.department) {
      select.department = { select: { name: true, abbreviation: true } };
    }

    const employee = await this.employeeRepository.findById(id, select);

    if (!employee) {
      throw new NotFoundException(`Employee with ID "${id}" not found`);
    }

    return employee;
  }
}
