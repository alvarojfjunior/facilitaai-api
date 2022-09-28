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
import { Service } from '@prisma/client';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { addDossier } from '../../shared/helpers/dossier.helpers';
import { ServiceRequestDTO, ServiceResponseDTO } from './service.dto';
import QueryBuilder from 'prisma-query-builder';

@UseGuards(JwtAuthGuard)
@ApiTags('service')
@Controller('service')
export class ServiceController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @ApiResponse({ type: [ServiceResponseDTO] })
  async getAll(
    @Query() query: any,
    @Request() req: Request | any
  ): Promise<Service[]> {
    const queryBuilder = new QueryBuilder(query);
    const apiRes: Service[] = await this.prisma.service.findMany({
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
  @ApiResponse({ type: ServiceResponseDTO })
  async getById(
    @Param('id') id: number,
    @Request() req: Request | any
  ): Promise<Service | null> {
    const apiRes: any = await this.prisma.service.findFirst({
      where: {
        AND: [{ id: Number(id) }, { companyId: req.user.companyId }],
      },
    });
    delete apiRes.password;
    return apiRes;
  }

  @Put(':id')
  @ApiBody({ type: ServiceRequestDTO })
  @ApiResponse({ type: ServiceResponseDTO })
  async update(
    @Param('id') id: number,
    @Body() data: Service,
    @Request() req: Request | any
  ): Promise<Service> {
    const apiRes: any = await this.prisma.service.update({
      where: { id: Number(id) },
      data,
    });
    addDossier(req.user.companyId, req.user.id, 'Atualizou', 'Serviço', apiRes.id);
    delete apiRes.password;
    return apiRes;
  }

  @Post()
  @ApiBody({ type: ServiceRequestDTO })
  @ApiResponse({ type: ServiceResponseDTO })
  async create(
    @Body() data: Service,
    @Request() req: Request | any
  ): Promise<Service> {
    data.companyId = req.user.companyId;
    const apiRes: any = await this.prisma.service.create({
      data,
    });
    addDossier(req.user.companyId, req.user.id, 'Cadastrou', 'Serviço', apiRes.id);
    delete apiRes.password;
    return apiRes;
  }

  @Delete(':id')
  @ApiResponse({ type: ServiceResponseDTO })
  async delete(
    @Param('id') id: number,
    @Request() req: Request | any
  ): Promise<Service> {
    const apiRes: any = await this.prisma.service.delete({
      where: { id: Number(id) },
    });
    addDossier(req.user.companyId, req.user.id, 'Deletou', 'Serviço', apiRes.id);
    delete apiRes.password;
    return apiRes;
  }
}
