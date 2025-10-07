import { Module } from '@nestjs/common';

import { EquipamentItemService } from './equipament-item.service';
import { EquipamentItemController } from './equipament-item.controller';
import { EquipamentItemRepository } from './equipament-item.repository';

import { ServicesModule } from '@ds-common/services/services.module';
import { EquipamentModule } from '@ds-modules/equipament/equipament.module';
import { EmployeeModule } from '@ds-modules/employee/employee.module';

@Module({
  imports: [ServicesModule, EquipamentModule, EmployeeModule],
  providers: [EquipamentItemService, EquipamentItemRepository],
  controllers: [EquipamentItemController],
})
export class EquipamentItemModule {}
