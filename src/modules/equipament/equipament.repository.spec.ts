import { EquipamentRepository } from './equipament.repository';

import { PrismaService } from '@ds-common/services/prisma/prisma.service';
import { EquipamentDto } from '@ds-dtos/equipament.dto';

describe('EquipamentRepository', () => {
  let repository: EquipamentRepository;
  let prismaService: PrismaService;

  beforeEach(() => {
    prismaService = new PrismaService();
    repository = new EquipamentRepository(prismaService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should create a new equipament', async () => {
    const equipamentDto: EquipamentDto = {
      name: 'Equipament 1',
      brand: 'Dell',
      category: 'Notebook',
      prefix: 'NB',
    };
    const createdEquipament = {
      id: 1,
      ...equipamentDto,
      active: true,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    };

    prismaService.equipament.create = jest
      .fn()
      .mockResolvedValue(createdEquipament);

    const result = await repository.create(equipamentDto);
    expect(result).toEqual(createdEquipament);
  });

  it('should find an equipament by name', async () => {
    const equipamentName = 'Equipamento 1';
    const equipament = {
      id: 1,
      name: equipamentName,
      prefix: 'EQ1',
      active: true,
      createdAt: new Date(),
      brand: 'BrandA',
      category: 'Category A',
      updatedAt: null,
      deletedAt: null,
    };

    prismaService.equipament.findUnique = jest
      .fn()
      .mockResolvedValue(equipament);

    const result = await repository.findByName(equipamentName);
    expect(result).toEqual(equipament);
  });
});
