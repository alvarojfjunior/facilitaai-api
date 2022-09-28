import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { SaleController } from './sale.controller';

@Module({
  imports: [],
  controllers: [SaleController],
  providers: [PrismaService],
  exports: [],
})
export class SaleuModule {}
