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
import { Product } from '@prisma/client';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { addDossier } from '../../shared/helpers/dossier.helpers';
import { ProductRequestDTO, ProductResponseDTO } from './product.dto';
import QueryBuilder from 'prisma-query-builder';

@UseGuards(JwtAuthGuard)
@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @ApiResponse({ type: [ProductResponseDTO] })
  async getAll(
    @Query() query: any,
    @Request() req: Request | any
  ): Promise<Product[]> {
    const queryBuilder = new QueryBuilder(query);
    const apiRes: Product[] = await this.prisma.product.findMany({
      where: {
        AND: [queryBuilder.query, { companyId: req.user.companyId }],
      },
    });
    return apiRes
  }

  @Get(':id')
  @ApiResponse({ type: ProductResponseDTO })
  async getById(
    @Param('id') id: number,
    @Request() req: Request | any
  ): Promise<Product | null> {
    const apiRes: any = await this.prisma.product.findFirst({
      where: {
        AND: [{ id: Number(id) }, { companyId: req.user.companyId }],
      },
    });
    return apiRes;
  }

  @Put(':id')
  @ApiBody({ type: ProductRequestDTO })
  @ApiResponse({ type: ProductResponseDTO })
  async update(
    @Param('id') id: number,
    @Body() data: Product,
    @Request() req: Request | any
  ): Promise<Product> {
    const apiRes: any = await this.prisma.product.update({
      where: { id: Number(id) },
      data,
    });
    addDossier(req.user.companyId, req.user.id, 'Atualizou', 'Produto', apiRes.id);
    return apiRes;
  }

  @Post()
  @ApiBody({ type: ProductRequestDTO })
  @ApiResponse({ type: ProductResponseDTO })
  async create(
    @Body() data: Product,
    @Request() req: Request | any
  ): Promise<Product> {
    data.companyId = req.user.companyId;
    const apiRes: any = await this.prisma.product.create({
      data,
    });
    addDossier(req.user.companyId, req.user.id, 'Cadastrou', 'Produto', apiRes.id);
    delete apiRes.password;
    return apiRes;
  }

  @Delete(':id')
  @ApiResponse({ type: ProductResponseDTO })
  async delete(
    @Param('id') id: number,
    @Request() req: Request | any
  ): Promise<Product> {
    const apiRes: any = await this.prisma.product.delete({
      where: { id: Number(id) },
    });
    addDossier(req.user.companyId, req.user.id, 'Deletou', 'Produto', apiRes.id);
    delete apiRes.password;
    return apiRes;
  }
}
