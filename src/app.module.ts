import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServicesModule } from './common/services/services.module';
import { EquipamentModule } from './modules/equipament/equipament.module';
import { DepartmentModule } from './modules/department/department.module';

@Module({
  imports: [ServicesModule, EquipamentModule, DepartmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
