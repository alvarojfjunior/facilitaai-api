/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Dossier as DossierModel } from '@prisma/client';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { BodyResponseDTO,  } from './dossier.dto';
import QueryBuilder from 'prisma-query-builder';

@UseGuards(JwtAuthGuard)
@ApiTags('dossier')
@Controller('dossier')
export class DossierController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @ApiResponse({ type: [BodyResponseDTO] })
  async getAll(@Query() query: any): Promise<DossierModel[]> {
    const queryBuilder = new QueryBuilder(query);
    return this.prisma.dossier.findMany(
      queryBuilder.filter().paginate().build()
    );
  }
}
