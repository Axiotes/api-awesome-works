import { IntersectionType } from '@nestjs/mapped-types';

import { FindEmployeeDto } from './find-employee.dto';
import { SelectFieldsDto } from './select-fields.dto';

export class FindAllEmployeeDto extends IntersectionType(
  FindEmployeeDto,
  SelectFieldsDto,
) {}
