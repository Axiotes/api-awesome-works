import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServicesModule } from './common/services/services.module';
import { EquipamentModule } from './modules/equipament/equipament.module';

@Module({
  imports: [ServicesModule, EquipamentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
