import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Equipament, Prisma } from '@prisma/client';

import { EquipamentRepository } from './equipament.repository';

import { EquipamentDto } from '@ds-dtos/equipament.dto';

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
        `Equipment with the name "${equipament.name}" already exists`,
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
      throw new NotFoundException(`Equipment with ID "${id}" not found`);
    }

    return equipament;
  }
}
