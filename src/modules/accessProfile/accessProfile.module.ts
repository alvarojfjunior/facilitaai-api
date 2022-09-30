import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { AccessProfileController } from './accessProfile.controller';

@Module({
  imports: [],
  controllers: [AccessProfileController],
  providers: [PrismaService],
  exports: [],
})
export class AccessProfileModule {}
