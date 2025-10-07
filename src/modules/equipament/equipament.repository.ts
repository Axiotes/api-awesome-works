import { Equipament } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@ds-common/services/prisma/prisma.service';
import { EquipamentDto } from '@ds-dtos/equipament.dto';

@Injectable()
export class EquipamentRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(equipament: EquipamentDto): Promise<Equipament> {
    return await this.prisma.equipament.create({ data: equipament });
  }

  public async findByName<T extends Prisma.EquipamentSelect>(
    name: string,
    select?: T,
    active = true,
  ): Promise<Prisma.EquipamentGetPayload<{ select: T }> | null> {
    return this.prisma.equipament.findUnique({
      where: { name, active },
      select,
    });
  }

  public async findById<T extends Prisma.EquipamentSelect>(
    id: number,
    select?: T,
    active = true,
  ): Promise<Prisma.EquipamentGetPayload<{ select: T }> | null> {
    return this.prisma.equipament.findUnique({
      where: { id, active },
      select,
    });
  }
}
