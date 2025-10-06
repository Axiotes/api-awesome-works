import { Body, Controller, Post } from '@nestjs/common';
import { Equipament } from '@prisma/client';

import { EquipamentService } from './equipament.service';

import { EquipamentDto } from '@ds-dtos/equipament.dto';
import { ApiResponse } from '@ds-common/types/api-response.type';

@Controller('equipament')
export class EquipamentController {
  constructor(private readonly equipamentService: EquipamentService) {}

  @Post()
  public async create(
    @Body() equipamentDto: EquipamentDto,
  ): Promise<ApiResponse<Equipament>> {
    const equipament = await this.equipamentService.create(equipamentDto);

    return { data: equipament };
  }
}
