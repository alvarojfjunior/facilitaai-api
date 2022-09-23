import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { DossierController } from './dossier.controller';

@Module({
  imports: [],
  controllers: [DossierController],
  providers: [PrismaService],
  exports: [],
})
export class DossierModule {}
