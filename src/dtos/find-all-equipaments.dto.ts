import { IntersectionType } from '@nestjs/mapped-types';

import { FindEquipamentDto } from './find-equipament.dto';
import { SelectFieldsDto } from './select-fields.dto';

export class FindAllEquipamentDto extends IntersectionType(
  FindEquipamentDto,
  SelectFieldsDto,
) {}
