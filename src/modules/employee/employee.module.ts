import { Module } from '@nestjs/common';

import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { EmployeeRepository } from './employee.repository';

import { ServicesModule } from '@ds-common/services/services.module';

@Module({
  imports: [ServicesModule],
  providers: [EmployeeService, EmployeeRepository],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
