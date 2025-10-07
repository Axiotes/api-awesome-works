import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EquipamentItem, Prisma } from '@prisma/client';

import { EquipamentItemRepository } from './equipament-item.repository';

import { EquipamentItemDto } from '@ds-dtos/equipament-item.dto';
import { EquipamentItemStatusEnum } from '@ds-common/enum/equipament-item-status.enum';
import { EquipamentService } from '@ds-modules/equipament/equipament.service';
import { FindEquipamentItemDto } from '@ds-dtos/find-equipament-item.dto';

@Injectable()
export class EquipamentItemService {
  constructor(
    private readonly equipamentItemRepository: EquipamentItemRepository,
    private readonly equipamentService: EquipamentService,
  ) {}

  public async create(equipament: EquipamentItemDto): Promise<EquipamentItem> {
    await this.equipamentService.findById(equipament.equipamentId, {
      id: true,
    });

    const equipamentSerialNumber =
      await this.equipamentItemRepository.findBySerialNumber(
        equipament.serialNumber,
        {
          id: true,
        },
      );

    if (equipamentSerialNumber) {
      throw new ConflictException(
        `Equipament Item with the serial number "${equipament.serialNumber}" already exists`,
      );
    }

    const equipamentImei = await this.equipamentItemRepository.findByImei(
      equipament.imei,
      {
        id: true,
      },
    );

    if (equipamentImei) {
      throw new ConflictException(
        `Equipament Item with the IMEI "${equipament.imei}" already exists`,
      );
    }

    const equipamentItem = {
      serialNumber: equipament.serialNumber,
      imei: equipament.imei,
      equipamentModelId: equipament.equipamentId,
      employeeId: null,
      status: EquipamentItemStatusEnum.AVAILABLE,
      active: true,
      createdAt: new Date(),
      updatedAt: undefined,
      deletedAt: undefined,
    };

    return await this.equipamentItemRepository.create(equipamentItem);
  }

  public async findById(
    id: number,
    select?: Prisma.EquipamentItemSelect,
  ): Promise<EquipamentItem> {
    const equipament = await this.equipamentItemRepository.findById(id, select);

    if (!equipament) {
      throw new NotFoundException(`Equipament Item with ID "${id}" not found`);
    }

    return equipament;
  }

  public async findAll(
    findEquipamentDto: FindEquipamentItemDto,
    select?: Prisma.EquipamentItemSelect,
  ): Promise<EquipamentItem[]> {
    let where = {};

    const filters: { [K in keyof FindEquipamentItemDto]?: () => void } = {
      active: () => (where = { ...where, active: findEquipamentDto.active }),
      serialNumber: () =>
        (where = {
          ...where,
          serialNumber: {
            contains: findEquipamentDto.serialNumber,
            mode: 'insensitive',
          },
        }),
      imei: () =>
        (where = {
          ...where,
          imei: { contains: findEquipamentDto.imei, mode: 'insensitive' },
        }),
      equipamentId: () =>
        (where = {
          ...where,
          equipamentId: {
            contains: findEquipamentDto.equipamentId,
            mode: 'insensitive',
          },
        }),
      employeeId: () =>
        (where = {
          ...where,
          employeeId: {
            contains: findEquipamentDto.employeeId,
            mode: 'insensitive',
          },
        }),
      status: () =>
        (where = {
          ...where,
          status: {
            contains: findEquipamentDto.status,
            mode: 'insensitive',
          },
        }),
    };

    for (const key in findEquipamentDto) {
      if (key === 'skip' || key === 'limit') continue;

      const func = filters[key];

      if (func) func();
    }

    return await this.equipamentItemRepository.findAll(
      findEquipamentDto.skip,
      findEquipamentDto.limit,
      where,
      select,
    );
  }
}
