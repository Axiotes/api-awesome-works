import { Module } from '@nestjs/common';

import { EquipamentService } from './equipament.service';
import { EquipamentController } from './equipament.controller';
import { EquipamentRepository } from './equipament.repository';

import { ServicesModule } from '@ds-common/services/services.module';

@Module({
  imports: [ServicesModule],
  providers: [EquipamentService, EquipamentRepository],
  controllers: [EquipamentController],
})
export class EquipamentModule {}
