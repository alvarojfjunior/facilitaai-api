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
import { BodyRequestDTO, BodyResponseDTO } from './product.dto';
import QueryBuilder from 'prisma-query-builder';

@UseGuards(JwtAuthGuard)
@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @ApiResponse({ type: [BodyResponseDTO] })
  async getAll(
    @Query() query: any,
    @Request() req: Request | any
  ): Promise<Product[]> {
    const queryBuilder = new QueryBuilder(query);
    console.log(queryBuilder.query);
    return this.prisma.product.findMany({
      where: {
        AND: [queryBuilder.query, { companyId: req.user.companyId }],
      },
    });
  }

  @Get(':id')
  @ApiResponse({ type: BodyResponseDTO })
  async getById(
    @Param('id') id: number,
    @Request() req: Request | any
  ): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: {
        id: Number(id),
        companyId: 1
      },
    });
  }

  @Post()
  @ApiBody({ type: BodyRequestDTO })
  @ApiResponse({ type: BodyResponseDTO })
  async create(
    @Body() data: Product,
    @Request() req: Request | any
  ): Promise<Product> {
    const dbRes: Product = await this.prisma.product.create({
      data,
    });
    addDossier(req.user.id, 'Inseriu', 'Produto', dbRes.id);
    return dbRes;
  }

  @Put(':id')
  @ApiBody({ type: BodyRequestDTO })
  @ApiResponse({ type: BodyResponseDTO })
  async update(
    @Param('id') id: number,
    @Body() data: Product,
    @Request() req: Request | any
  ): Promise<Product> {
    const dbRes: Product = await this.prisma.product.update({
      where: { id: Number(id) },
      data,
    });
    addDossier(req.user.id, 'Atualizou', 'Produto', dbRes.id);
    return dbRes;
  }

  @Delete(':id')
  @ApiResponse({ type: BodyResponseDTO })
  async delete(
    @Param('id') id: number,
    @Request() req: Request | any
  ): Promise<Product> {
    const dbRes: Product = await this.prisma.product.delete({
      where: { id: Number(id) },
    });
    addDossier(req.user.id, 'Deletou', 'Produto', dbRes.id);
    return dbRes;
  }
}
