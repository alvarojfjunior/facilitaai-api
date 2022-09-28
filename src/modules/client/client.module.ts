import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { ClientController } from './client.controller';

@Module({
  imports: [],
  controllers: [ClientController],
  providers: [PrismaService],
  exports: [],
})
export class ClientuModule {}
