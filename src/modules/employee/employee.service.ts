import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Employee, Prisma } from '@prisma/client';

import { EmployeeRepository } from './employee.repository';

import { EmployeeDto } from '@ds-dtos/employee.dto';
import { FindEmployeeDto } from '@ds-dtos/find-employee.dto';
import { UpdateEmployeeDto } from '@ds-dtos/update-employee.dto';

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

  public async findAll(
    findEmployeeDto: FindEmployeeDto,
    select?: Prisma.EmployeeSelect,
  ): Promise<Employee[]> {
    let where = {};

    const filters: { [K in keyof FindEmployeeDto]?: () => void } = {
      active: () => (where = { ...where, active: findEmployeeDto.active }),
      name: () =>
        (where = {
          ...where,
          name: { contains: findEmployeeDto.name, mode: 'insensitive' },
        }),
      jobTitle: () =>
        (where = {
          ...where,
          jobTitle: { contains: findEmployeeDto.jobTitle, mode: 'insensitive' },
        }),
      departmentId: () =>
        (where = {
          ...where,
          departmentId: {
            contains: findEmployeeDto.departmentId,
            mode: 'insensitive',
          },
        }),
    };

    for (const key in findEmployeeDto) {
      if (key === 'skip' || key === 'limit') continue;

      const func = filters[key];

      if (func) func();
    }

    return await this.employeeRepository.findAll(
      findEmployeeDto.skip,
      findEmployeeDto.limit,
      where,
      select,
    );
  }

  public async update(
    id: number,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    const employee = await this.findById(id);

    if (updateEmployeeDto.cpf && updateEmployeeDto.cpf !== employee.cpf) {
      const employeeCpf = await this.employeeRepository.findByCpf(
        updateEmployeeDto.cpf,
        { id: true },
      );

      if (employeeCpf) {
        throw new ConflictException(
          `Employee with the CPF "${updateEmployeeDto.cpf}" already exists`,
        );
      }
    }

    if (updateEmployeeDto.email && updateEmployeeDto.email !== employee.email) {
      const employeeEmail = await this.employeeRepository.findByEmail(
        updateEmployeeDto.email,
        { id: true },
      );

      if (employeeEmail) {
        throw new ConflictException(
          `Employee with the email "${updateEmployeeDto.email}" already exists`,
        );
      }
    }

    const updatedAt = new Date();
    const employeeUpdated = {
      id,
      name: updateEmployeeDto.name ?? employee.name,
      cpf: updateEmployeeDto.cpf ?? employee.cpf,
      email: updateEmployeeDto.email ?? employee.email,
      jobTitle: updateEmployeeDto.jobTitle ?? employee.jobTitle,
      departmentId: updateEmployeeDto.departmentId ?? employee.departmentId,
      active: employee.active,
      createdAt: employee.createdAt,
      updatedAt: updatedAt,
      deletedAt: employee.deletedAt,
    };

    return await this.employeeRepository.update(id, employeeUpdated);
  }

  public async deactivate(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findById(id, {
      id: true,
    });

    if (!employee) {
      throw new NotFoundException(
        `Employee with non-existent or disabled "${id}" ID`,
      );
    }

    const deletedAt = new Date();

    const employeeUpdates = { ...employee, active: false, deletedAt };

    return await this.employeeRepository.update(id, employeeUpdates);
  }

  public async reactivate(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findById(
      id,
      {
        id: true,
      },
      false,
    );

    if (!employee) {
      throw new NotFoundException(
        `Employee with non-existent or activated "${id}" ID`,
      );
    }

    const deletedAt = null;

    const employeeUpdates = { ...employee, active: true, deletedAt };

    return await this.employeeRepository.update(id, employeeUpdates);
  }
}
