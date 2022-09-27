/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { Company } from '@prisma/client';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { addDossier } from '../../shared/helpers/dossier.helpers';
import { CompanyRequestDTO, CompanyResponseDTO } from './company.dto';
import QueryBuilder from 'prisma-query-builder';

@UseGuards(JwtAuthGuard)
@ApiTags('company')
@Controller('company')
export class CompanyController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @ApiResponse({ type: [CompanyResponseDTO] })
  async getAll(@Query() query: any): Promise<Company[]> {
    const queryBuilder = new QueryBuilder(query);
    return this.prisma.company.findMany(
      queryBuilder.filter().paginate().build()
    );
  }

  @Get(':id')
  @ApiResponse({ type: CompanyResponseDTO })
  async getById(@Param('id') id: number): Promise<Company | null> {
    return this.prisma.company.findUnique({ where: { id: Number(id) } });
  }

  @Post()
  @ApiBody({ type: CompanyRequestDTO })
  @ApiResponse({ type: CompanyResponseDTO })
  async create(
    @Body() data: Company,
    @Request() req: Request | any
  ): Promise<Company> {
    const dbRes: Company = await this.prisma.company.create({
      data,
    });
    addDossier(req.user.id, 'Inseriu', 'Empresa', dbRes.id);
    return dbRes;
  }

  @Put(':id')
  @ApiBody({ type: CompanyRequestDTO })
  @ApiResponse({ type: CompanyResponseDTO })
  async update(
    @Param('id') id: number,
    @Body() data: Company,
    @Request() req: Request | any
  ): Promise<Company> {
    const dbRes: Company = await this.prisma.company.update({
      where: { id: Number(id) },
      data,
    });
    addDossier(req.user.id, 'Atualizou', 'Empresa', dbRes.id);
    return dbRes;
  }

  @Delete(':id')
  @ApiResponse({ type: CompanyResponseDTO })
  async delete(
    @Param('id') id: number,
    @Request() req: Request | any
  ): Promise<Company> {
    const dbRes: Company = await this.prisma.company.delete({
      where: { id: Number(id) },
    });
    addDossier(req.user.id, 'Deletou', 'Empresa', dbRes.id);
    return dbRes;
  }
}
