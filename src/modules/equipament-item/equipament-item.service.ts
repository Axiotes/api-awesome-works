import { Injectable } from '@nestjs/common';

import { EquipamentItemRepository } from './equipament-item.repository';

@Injectable()
export class EquipamentItemService {
  constructor(
    private readonly equipamentItemRepository: EquipamentItemRepository,
  ) {}
}
