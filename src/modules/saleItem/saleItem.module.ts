import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { SaleItemController } from './saleItem.controller';

@Module({
  imports: [],
  controllers: [SaleItemController],
  providers: [PrismaService],
  exports: [],
})
export class SaleItemuModule {}
