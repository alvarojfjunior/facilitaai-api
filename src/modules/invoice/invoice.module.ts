import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { InvoiceController } from './invoice.controller';

@Module({
  imports: [],
  controllers: [InvoiceController],
  providers: [PrismaService],
  exports: [],
})
export class InvoiceuModule {}
