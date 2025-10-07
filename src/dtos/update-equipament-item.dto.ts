import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

import { EquipamentItemDto } from './equipament-item.dto';

import { EquipamentItemStatusEnum } from '@ds-common/enum/equipament-item-status.enum';

export class UpdateEquipamentItemDto extends PartialType(EquipamentItemDto) {
  @IsOptional()
  @IsString()
  employeeId?: string;

  @IsOptional()
  @IsEnum(EquipamentItemStatusEnum)
  status?: EquipamentItemStatusEnum;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  active?: boolean;
}
