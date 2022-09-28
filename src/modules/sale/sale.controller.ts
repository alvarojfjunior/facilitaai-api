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
import { Sale } from '@prisma/client';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { addDossier } from '../../shared/helpers/dossier.helpers';
import { SaleRequestDTO, SaleResponseDTO } from './sale.dto';
import QueryBuilder from 'prisma-query-builder';

@UseGuards(JwtAuthGuard)
@ApiTags('sale')
@Controller('sale')
export class SaleController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @ApiResponse({ type: [SaleResponseDTO] })
  async getAll(
    @Query() query: any,
    @Request() req: Request | any
  ): Promise<Sale[]> {
    const queryBuilder = new QueryBuilder(query);
    const apiRes: Sale[] = await this.prisma.sale.findMany({
      where: {
        AND: [queryBuilder.query, { companyId: req.user.companyId }],
      },
    });
    return apiRes.map((u: any) => {
      delete u.password;
      return u;
    });
  }

  @Get(':id')
  @ApiResponse({ type: SaleResponseDTO })
  async getById(
    @Param('id') id: number,
    @Request() req: Request | any
  ): Promise<Sale | null> {
    const apiRes: any = await this.prisma.sale.findFirst({
      where: {
        AND: [{ id: Number(id) }, { companyId: req.user.companyId }],
      },
    });
    delete apiRes.password;
    return apiRes;
  }

  @Put(':id')
  @ApiBody({ type: SaleRequestDTO })
  @ApiResponse({ type: SaleResponseDTO })
  async update(
    @Param('id') id: number,
    @Body() data: Sale,
    @Request() req: Request | any
  ): Promise<Sale> {
    const apiRes: any = await this.prisma.sale.update({
      where: { id: Number(id) },
      data,
    });
    addDossier(req.user.companyId, req.user.id, 'Atualizou', 'Venda', apiRes.id);
    delete apiRes.password;
    return apiRes;
  }

  @Post()
  @ApiBody({ type: SaleRequestDTO })
  @ApiResponse({ type: SaleResponseDTO })
  async create(
    @Body() data: Sale,
    @Request() req: Request | any
  ): Promise<Sale> {
    data.companyId = req.user.companyId;
    const apiRes: any = await this.prisma.sale.create({
      data,
    });
    addDossier(req.user.companyId, req.user.id, 'Cadastrou', 'Venda', apiRes.id);
    delete apiRes.password;
    return apiRes;
  }

  @Delete(':id')
  @ApiResponse({ type: SaleResponseDTO })
  async delete(
    @Param('id') id: number,
    @Request() req: Request | any
  ): Promise<Sale> {
    const apiRes: any = await this.prisma.sale.delete({
      where: { id: Number(id) },
    });
    addDossier(req.user.companyId, req.user.id, 'Deletou', 'Venda', apiRes.id);
    delete apiRes.password;
    return apiRes;
  }
}
