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
import { SaleItem } from '@prisma/client';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { addDossier } from '../../shared/helpers/dossier.helpers';
import { SaleItemRequestDTO, SaleItemResponseDTO } from './saleItem.dto';
import QueryBuilder from 'prisma-query-builder';

@UseGuards(JwtAuthGuard)
@ApiTags('saleItem')
@Controller('saleItem')
export class SaleItemController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @ApiResponse({ type: [SaleItemResponseDTO] })
  async getAll(
    @Query() query: any,
    @Request() req: Request | any
  ): Promise<SaleItem[]> {
    const queryBuilder = new QueryBuilder(query);
    const apiRes: SaleItem[] = await this.prisma.saleItem.findMany({
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
  @ApiResponse({ type: SaleItemResponseDTO })
  async getById(
    @Param('id') id: number,
    @Request() req: Request | any
  ): Promise<SaleItem | null> {
    const apiRes: any = await this.prisma.saleItem.findFirst({
      where: {
        AND: [{ id: Number(id) }, { companyId: req.user.companyId }],
      },
    });
    delete apiRes.password;
    return apiRes;
  }

  @Put(':id')
  @ApiBody({ type: SaleItemRequestDTO })
  @ApiResponse({ type: SaleItemResponseDTO })
  async update(
    @Param('id') id: number,
    @Body() data: SaleItem,
    @Request() req: Request | any
  ): Promise<SaleItem> {
    const apiRes: any = await this.prisma.saleItem.update({
      where: { id: Number(id) },
      data,
    });
    addDossier(req.user.companyId, req.user.id, 'Atualizou', 'Item de venda', apiRes.id);
    delete apiRes.password;
    return apiRes;
  }

  @Post()
  @ApiBody({ type: SaleItemRequestDTO })
  @ApiResponse({ type: SaleItemResponseDTO })
  async create(
    @Body() data: SaleItem,
    @Request() req: Request | any
  ): Promise<SaleItem> {
    data.companyId = req.user.companyId;
    const apiRes: any = await this.prisma.saleItem.create({
      data,
    });
    addDossier(req.user.companyId, req.user.id, 'Cadastrou', 'Item de venda', apiRes.id);
    delete apiRes.password;
    return apiRes;
  }

  @Delete(':id')
  @ApiResponse({ type: SaleItemResponseDTO })
  async delete(
    @Param('id') id: number,
    @Request() req: Request | any
  ): Promise<SaleItem> {
    const apiRes: any = await this.prisma.saleItem.delete({
      where: { id: Number(id) },
    });
    addDossier(req.user.companyId, req.user.id, 'Deletou', 'Item de venda', apiRes.id);
    delete apiRes.password;
    return apiRes;
  }
}
