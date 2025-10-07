import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';

import { EquipamentService } from './equipament.service';
import { EquipamentRepository } from './equipament.repository';

import { EquipamentDto } from '@ds-dtos/equipament.dto';

describe('EquipamentService', () => {
  let service: EquipamentService;
  let repository: EquipamentRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EquipamentService,
        {
          provide: EquipamentRepository,
          useValue: {
            create: jest.fn(),
            findByName: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EquipamentService>(EquipamentService);
    repository = module.get<EquipamentRepository>(EquipamentRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new equipment succesffuly', async () => {
    const equipamentDto: EquipamentDto = {
      name: 'Equipament 1',
      brand: 'Dell',
      category: 'Notebook',
      prefix: 'NB',
    };

    repository.findByName = jest.fn().mockResolvedValue(null);
    repository.create = jest.fn().mockResolvedValue({
      id: 1,
      ...equipamentDto,
      active: true,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    });

    const result = await service.create(equipamentDto);

    expect(repository.findByName).toHaveBeenCalledWith(equipamentDto.name, {
      id: true,
    });
    expect(repository.create).toHaveBeenCalledWith(equipamentDto);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('name', equipamentDto.name);
  });

  it('should throw a conflict exception when trying to create an existing equipment', async () => {
    const equipamentDto: EquipamentDto = {
      name: 'Equipament 1',
      brand: 'Dell',
      category: 'Notebook',
      prefix: 'NB',
    };

    repository.findByName = jest.fn().mockResolvedValue({
      id: 1,
    });

    await expect(service.create(equipamentDto)).rejects.toThrow(
      new ConflictException(
        `Equipment with the name "${equipamentDto.name}" already exists`,
      ),
    );
    expect(repository.create).toHaveBeenCalledTimes(0);
  });
});
