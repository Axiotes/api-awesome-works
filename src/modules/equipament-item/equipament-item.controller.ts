import { Controller } from '@nestjs/common';

import { EquipamentItemService } from './equipament-item.service';

@Controller('equipament-item')
export class EquipamentItemController {
  constructor(private readonly equipamentItemService: EquipamentItemService) {}
}
