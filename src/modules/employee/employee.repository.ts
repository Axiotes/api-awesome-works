import { PrismaService } from '@ds-common/services/prisma/prisma.service';

export class EmployeeRepository {
  constructor(private readonly prisma: PrismaService) {}
}
