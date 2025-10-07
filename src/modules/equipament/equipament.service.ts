import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Equipament, Prisma } from '@prisma/client';

import { EquipamentRepository } from './equipament.repository';

import { EquipamentDto } from '@ds-dtos/equipament.dto';
import { FindEquipamentDto } from '@ds-dtos/find-equipament.dto';

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
}
