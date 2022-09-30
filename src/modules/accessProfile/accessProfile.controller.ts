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
import { AccessProfile } from '@prisma/client';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { addDossier } from '../../shared/helpers/dossier.helpers';
import { AccessProfileRequestDTO, AccessProfileResponseDTO } from './accessProfile.dto';
import QueryBuilder from 'prisma-query-builder';

@UseGuards(JwtAuthGuard)
@ApiTags('accessProfile')
@Controller('accessProfile')
export class AccessProfileController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @ApiResponse({ type: [AccessProfileResponseDTO] })
  async getAll(
    @Query() query: any,
    @Request() req: Request | any
  ): Promise<AccessProfile[]> {
    const queryBuilder = new QueryBuilder(query);
    const apiRes: AccessProfile[] = await this.prisma.accessProfile.findMany({
      where: {
        AND: [queryBuilder.query, { companyId: req.user.companyId }],
      },
    });
    return apiRes
  }

  @Get(':id')
  @ApiResponse({ type: AccessProfileResponseDTO })
  async getById(
    @Param('id') id: number,
    @Request() req: Request | any
  ): Promise<AccessProfile | null> {
    const apiRes: any = await this.prisma.accessProfile.findFirst({
      where: {
        AND: [{ id: Number(id) }, { companyId: req.user.companyId }],
      },
    });
    return apiRes;
  }

  @Put(':id')
  @ApiBody({ type: AccessProfileRequestDTO })
  @ApiResponse({ type: AccessProfileResponseDTO })
  async update(
    @Param('id') id: number,
    @Body() data: AccessProfile,
    @Request() req: Request | any
  ): Promise<AccessProfile> {
    const apiRes: any = await this.prisma.accessProfile.update({
      where: { id: Number(id) },
      data,
    });
    addDossier(req.user.companyId, req.user.id, 'Atualizou', 'Perfil de Acesso', apiRes.id);
    return apiRes;
  }

  @Post()
  @ApiBody({ type: AccessProfileRequestDTO })
  @ApiResponse({ type: AccessProfileResponseDTO })
  async create(
    @Body() data: AccessProfile,
    @Request() req: Request | any
  ): Promise<AccessProfile> {
    data.companyId = req.user.companyId;
    const apiRes: any = await this.prisma.accessProfile.create({
      data,
    });
    addDossier(req.user.companyId, req.user.id, 'Cadastrou', 'Perfil de Acesso', apiRes.id);
    delete apiRes.password;
    return apiRes;
  }

  @Delete(':id')
  @ApiResponse({ type: AccessProfileResponseDTO })
  async delete(
    @Param('id') id: number,
    @Request() req: Request | any
  ): Promise<AccessProfile> {
    const apiRes: any = await this.prisma.accessProfile.delete({
      where: { id: Number(id) },
    });
    addDossier(req.user.companyId, req.user.id, 'Deletou', 'Perfil de Acesso', apiRes.id);
    delete apiRes.password;
    return apiRes;
  }
}
