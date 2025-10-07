import { Module } from '@nestjs/common';

import { LoggerService } from './logger/logger.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
  providers: [LoggerService, PrismaService],
  exports: [PrismaService],
})
export class ServicesModule {}
