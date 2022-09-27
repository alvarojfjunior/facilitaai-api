import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { ProductController } from './product.controller';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [PrismaService],
  exports: [],
})
export class ProductuModule {}
