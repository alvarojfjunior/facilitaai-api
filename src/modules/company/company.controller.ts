/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Company as CompanyModel } from '@prisma/client';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { BodyResponseDTO,  } from './company.dto';
import QueryBuilder from 'prisma-query-builder';

@UseGuards(JwtAuthGuard)
@ApiTags('company')
@Controller('company')
export class CompanyController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @ApiResponse({ type: [BodyResponseDTO] })
  async getAll(@Query() query: any): Promise<CompanyModel[]> {
    const queryBuilder = new QueryBuilder(query);
    return this.prisma.company.findMany(
      queryBuilder.filter().paginate().build()
    );
  }
}
