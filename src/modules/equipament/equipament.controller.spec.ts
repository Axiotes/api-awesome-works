import { Test, TestingModule } from '@nestjs/testing';

import { EquipamentController } from './equipament.controller';
import { EquipamentService } from './equipament.service';

describe('EquipamentController', () => {
  let controller: EquipamentController;
  let service: EquipamentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipamentController],
      providers: [
        {
          provide: EquipamentService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<EquipamentController>(EquipamentController);
    service = module.get<EquipamentService>(EquipamentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new equipment successfully', async () => {
    const equipamentDto = {
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

    service.create = jest.fn().mockResolvedValue(createdEquipament);

    const result = await controller.create(equipamentDto);

    expect(service.create).toHaveBeenCalledWith(equipamentDto);
    expect(result).toEqual({ data: createdEquipament });
  });
});
