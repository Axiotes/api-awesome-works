import { Test, TestingModule } from '@nestjs/testing';

import { EquipamentItemService } from './equipament-item.service';

describe('EquipamentItemService', () => {
  let service: EquipamentItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipamentItemService],
    }).compile();

    service = module.get<EquipamentItemService>(EquipamentItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
