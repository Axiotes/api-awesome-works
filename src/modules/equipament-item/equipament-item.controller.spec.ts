import { Test, TestingModule } from '@nestjs/testing';

import { EquipamentItemController } from './equipament-item.controller';

describe('EquipamentItemController', () => {
  let controller: EquipamentItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipamentItemController],
    }).compile();

    controller = module.get<EquipamentItemController>(EquipamentItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
