import { Injectable } from '@nestjs/common';

import { PrismaService } from '@ds-common/services/prisma/prisma.service';

@Injectable()
export class EquipamentItemRepository {
  constructor(private readonly prisma: PrismaService) {}
}
