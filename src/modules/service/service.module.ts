import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { ServiceController } from './service.controller';

@Module({
  imports: [],
  controllers: [ServiceController],
  providers: [PrismaService],
  exports: [],
})
export class ServiceuModule {}
