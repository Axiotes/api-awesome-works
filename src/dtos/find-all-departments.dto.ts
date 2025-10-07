import { IntersectionType } from '@nestjs/swagger';

import { FindDepartmentDto } from './find-department.dto';
import { SelectFieldsDto } from './select-fields.dto';

export class FindAllDepartmentDto extends IntersectionType(
  FindDepartmentDto,
  SelectFieldsDto,
) {}
