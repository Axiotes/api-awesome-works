import { IntersectionType } from '@nestjs/mapped-types';

import { FindEquipamentItemDto } from './find-equipament-item.dto';
import { SelectFieldsDto } from './select-fields.dto';

export class FindAllEquipamentItemDto extends IntersectionType(
  FindEquipamentItemDto,
  SelectFieldsDto,
) {}
