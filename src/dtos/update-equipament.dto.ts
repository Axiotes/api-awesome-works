import { PartialType } from '@nestjs/swagger';

import { EquipamentDto } from './equipament.dto';

export class UpdateEquipamentDto extends PartialType(EquipamentDto) {}
