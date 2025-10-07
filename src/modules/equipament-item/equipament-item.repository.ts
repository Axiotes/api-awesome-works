import { Injectable } from '@nestjs/common';
import { EquipamentItem, Prisma } from '@prisma/client';

import { PrismaService } from '@ds-common/services/prisma/prisma.service';

@Injectable()
export class EquipamentItemRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(equipament: EquipamentItem): Promise<EquipamentItem> {
    return await this.prisma.equipamentItem.create({ data: equipament });
  }

  public async findBySerialNumber<T extends Prisma.EquipamentItemSelect>(
    serialNumber: string,
    select?: T,
    active = true,
  ): Promise<Prisma.EquipamentItemGetPayload<{ select: T }> | null> {
    return this.prisma.equipamentItem.findUnique({
      where: { serialNumber, active },
      select,
    });
  }

  public async findByImei<T extends Prisma.EquipamentItemSelect>(
    imei: string,
    select?: T,
    active = true,
  ): Promise<Prisma.EquipamentItemGetPayload<{ select: T }> | null> {
    return this.prisma.equipamentItem.findUnique({
      where: { imei, active },
      select,
    });
  }

  public async findById<T extends Prisma.EquipamentItemSelect>(
    id: number,
    select?: T,
    active = true,
  ): Promise<Prisma.EquipamentItemGetPayload<{ select: T }> | null> {
    return this.prisma.equipamentItem.findUnique({
      where: { id, active },
      select,
    });
  }

  public async findAll<T extends Prisma.EquipamentItemSelect>(
    skip: number,
    limit: number,
    where: Prisma.EquipamentItemWhereInput = {},
    select?: T,
  ): Promise<Prisma.EquipamentItemGetPayload<{ select: T }>[] | null> {
    return this.prisma.equipamentItem.findMany({
      where,
      skip,
      take: limit,
      select,
    });
  }

  public async update(
    id: number,
    equipamentItem: Partial<EquipamentItem>,
  ): Promise<EquipamentItem> {
    return this.prisma.equipamentItem.update({
      where: { id },
      data: equipamentItem,
    });
  }
}
