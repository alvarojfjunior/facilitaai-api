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
import { Client } from '@prisma/client';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { addDossier } from '../../shared/helpers/dossier.helpers';
import { ClientRequestDTO, ClientResponseDTO } from './client.dto';
import QueryBuilder from 'prisma-query-builder';

@UseGuards(JwtAuthGuard)
@ApiTags('client')
@Controller('client')
export class ClientController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @ApiResponse({ type: [ClientResponseDTO] })
  async getAll(
    @Query() query: any,
    @Request() req: Request | any
  ): Promise<Client[]> {
    const queryBuilder = new QueryBuilder(query);
    const apiRes: Client[] = await this.prisma.client.findMany({
      where: {
        AND: [queryBuilder.query, { companyId: req.user.companyId }],
      },
    });
    return apiRes
  }

  @Get(':id')
  @ApiResponse({ type: ClientResponseDTO })
  async getById(
    @Param('id') id: number,
    @Request() req: Request | any
  ): Promise<Client | null> {
    const apiRes: any = await this.prisma.client.findFirst({
      where: {
        AND: [{ id: Number(id) }, { companyId: req.user.companyId }],
      },
    });
    return apiRes;
  }

  @Put(':id')
  @ApiBody({ type: ClientRequestDTO })
  @ApiResponse({ type: ClientResponseDTO })
  async update(
    @Param('id') id: number,
    @Body() data: Client,
    @Request() req: Request | any
  ): Promise<Client> {
    const apiRes: any = await this.prisma.client.update({
      where: { id: Number(id) },
      data,
    });
    addDossier(req.user.companyId, req.user.id, 'Atualizou', 'Cliente', apiRes.id);
    return apiRes;
  }

  @Post()
  @ApiBody({ type: ClientRequestDTO })
  @ApiResponse({ type: ClientResponseDTO })
  async create(
    @Body() data: Client,
    @Request() req: Request | any
  ): Promise<Client> {
    data.companyId = req.user.companyId;
    const apiRes: any = await this.prisma.client.create({
      data,
    });
    addDossier(req.user.companyId, req.user.id, 'Cadastrou', 'Cliente', apiRes.id);
    delete apiRes.password;
    return apiRes;
  }

  @Delete(':id')
  @ApiResponse({ type: ClientResponseDTO })
  async delete(
    @Param('id') id: number,
    @Request() req: Request | any
  ): Promise<Client> {
    const apiRes: any = await this.prisma.client.delete({
      where: { id: Number(id) },
    });
    addDossier(req.user.companyId, req.user.id, 'Deletou', 'Cliente', apiRes.id);
    delete apiRes.password;
    return apiRes;
  }
}
