import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Equipament, Prisma } from '@prisma/client';

import { EquipamentRepository } from './equipament.repository';

import { EquipamentDto } from '@ds-dtos/equipament.dto';
import { FindEquipamentDto } from '@ds-dtos/find-equipament.dto';
import { UpdateEquipamentDto } from '@ds-dtos/update-equipament.dto';

@Injectable()
export class EquipamentService {
  constructor(private readonly equipamentRepository: EquipamentRepository) {}

  public async create(equipament: EquipamentDto): Promise<Equipament> {
    const equipamentExists = await this.equipamentRepository.findByName(
      equipament.name,
      { id: true },
    );

    if (equipamentExists) {
      throw new ConflictException(
        `Equipament with the name "${equipament.name}" already exists`,
      );
    }

    return await this.equipamentRepository.create(equipament);
  }

  public async findById(
    id: number,
    select?: Prisma.EquipamentSelect,
  ): Promise<Equipament> {
    const equipament = await this.equipamentRepository.findById(id, select);

    if (!equipament) {
      throw new NotFoundException(`Equipament with ID "${id}" not found`);
    }

    return equipament;
  }

  public async findAll(
    findEquipamentDto: FindEquipamentDto,
    select?: Prisma.EquipamentSelect,
  ): Promise<Equipament[]> {
    let where = {};

    const filters: { [K in keyof FindEquipamentDto]?: () => void } = {
      active: () => (where = { ...where, active: findEquipamentDto.active }),
      name: () =>
        (where = {
          ...where,
          name: { contains: findEquipamentDto.name, mode: 'insensitive' },
        }),
      prefix: () =>
        (where = {
          ...where,
          prefix: { contains: findEquipamentDto.prefix, mode: 'insensitive' },
        }),
      category: () =>
        (where = {
          ...where,
          category: {
            contains: findEquipamentDto.category,
            mode: 'insensitive',
          },
        }),
      brand: () =>
        (where = {
          ...where,
          brand: { contains: findEquipamentDto.brand, mode: 'insensitive' },
        }),
    };

    for (const key in findEquipamentDto) {
      if (key === 'skip' || key === 'limit') continue;

      const func = filters[key];

      if (func) func();
    }

    return await this.equipamentRepository.findAll(
      findEquipamentDto.skip,
      findEquipamentDto.limit,
      where,
      select,
    );
  }

  public async update(
    id: number,
    updateEquipamentDto: UpdateEquipamentDto,
  ): Promise<Equipament> {
    const equipament = await this.findById(id);

    if (
      updateEquipamentDto.name &&
      updateEquipamentDto.name !== equipament.name
    ) {
      const equipamentExists = await this.equipamentRepository.findByName(
        updateEquipamentDto.name,
        { id: true },
      );

      if (equipamentExists) {
        throw new ConflictException(
          `Equipament with the name "${updateEquipamentDto.name}" already exists`,
        );
      }
    }

    const updatedAt = new Date();
    const equipamentUpdates = {
      id,
      name: updateEquipamentDto.name ?? equipament.name,
      prefix: updateEquipamentDto.prefix ?? equipament.prefix,
      category: updateEquipamentDto.category ?? equipament.category,
      brand: updateEquipamentDto.brand ?? equipament.brand,
      active: equipament.active,
      createdAt: equipament.createdAt,
      updatedAt,
      deletedAt: equipament.deletedAt,
    };

    return await this.equipamentRepository.update(id, equipamentUpdates);
  }

  public async deactivate(id: number): Promise<Equipament> {
    const equipament = await this.equipamentRepository.findById(id, {
      id: true,
    });

    if (!equipament) {
      throw new NotFoundException(
        `Equipment with non-existent or disabled "${id}" ID`,
      );
    }

    const deletedAt = new Date();

    const equipamentUpdates = { ...equipament, active: false, deletedAt };

    return await this.equipamentRepository.update(id, equipamentUpdates);
  }
}
