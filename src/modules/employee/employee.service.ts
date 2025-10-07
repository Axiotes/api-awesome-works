import { ConflictException, Injectable } from '@nestjs/common';
import { Employee } from '@prisma/client';

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
}
