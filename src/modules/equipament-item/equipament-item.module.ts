import { Module } from '@nestjs/common';

import { EquipamentItemService } from './equipament-item.service';
import { EquipamentItemController } from './equipament-item.controller';
import { EquipamentItemRepository } from './equipament-item.repository';

import { ServicesModule } from '@ds-common/services/services.module';

@Module({
  imports: [ServicesModule],
  providers: [EquipamentItemService, EquipamentItemRepository],
  controllers: [EquipamentItemController],
})
export class EquipamentItemModule {}
