import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CompanyController } from './company.controller';

@Module({
  imports: [],
  controllers: [CompanyController],
  providers: [PrismaService],
  exports: [],
})
export class CompanyModule {}
