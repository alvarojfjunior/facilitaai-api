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
import { Invoice } from '@prisma/client';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { addDossier } from '../../shared/helpers/dossier.helpers';
import { InvoiceRequestDTO, InvoiceResponseDTO } from './invoice.dto';
import QueryBuilder from 'prisma-query-builder';

@UseGuards(JwtAuthGuard)
@ApiTags('invoice')
@Controller('invoice')
export class InvoiceController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @ApiResponse({ type: [InvoiceResponseDTO] })
  async getAll(
    @Query() query: any,
    @Request() req: Request | any
  ): Promise<Invoice[]> {
    const queryBuilder = new QueryBuilder(query);
    const apiRes: Invoice[] = await this.prisma.invoice.findMany({
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
  @ApiResponse({ type: InvoiceResponseDTO })
  async getById(
    @Param('id') id: number,
    @Request() req: Request | any
  ): Promise<Invoice | null> {
    const apiRes: any = await this.prisma.invoice.findFirst({
      where: {
        AND: [{ id: Number(id) }, { companyId: req.user.companyId }],
      },
    });
    delete apiRes.password;
    return apiRes;
  }

  @Put(':id')
  @ApiBody({ type: InvoiceRequestDTO })
  @ApiResponse({ type: InvoiceResponseDTO })
  async update(
    @Param('id') id: number,
    @Body() data: Invoice,
    @Request() req: Request | any
  ): Promise<Invoice> {
    const apiRes: any = await this.prisma.invoice.update({
      where: { id: Number(id) },
      data,
    });
    addDossier(req.user.companyId, req.user.id, 'Atualizou', 'Conta', apiRes.id);
    delete apiRes.password;
    return apiRes;
  }

  @Post()
  @ApiBody({ type: InvoiceRequestDTO })
  @ApiResponse({ type: InvoiceResponseDTO })
  async create(
    @Body() data: Invoice,
    @Request() req: Request | any
  ): Promise<Invoice> {
    data.companyId = req.user.companyId;
    const apiRes: any = await this.prisma.invoice.create({
      data,
    });
    addDossier(req.user.companyId, req.user.id, 'Cadastrou', 'Conta', apiRes.id);
    delete apiRes.password;
    return apiRes;
  }

  @Delete(':id')
  @ApiResponse({ type: InvoiceResponseDTO })
  async delete(
    @Param('id') id: number,
    @Request() req: Request | any
  ): Promise<Invoice> {
    const apiRes: any = await this.prisma.invoice.delete({
      where: { id: Number(id) },
    });
    addDossier(req.user.companyId, req.user.id, 'Deletou', 'Conta', apiRes.id);
    delete apiRes.password;
    return apiRes;
  }
}
