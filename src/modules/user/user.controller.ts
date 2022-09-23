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
import { User } from '@prisma/client';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { addDossier } from '../../shared/helpers/dossier.helpers';
import { BodyUpdateRequestDTO, BodyResponseDTO } from './user.dto';
import QueryBuilder from 'prisma-query-builder';

@UseGuards(JwtAuthGuard)
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @ApiResponse({ type: [BodyResponseDTO] })
  async getAll(@Query() query: any): Promise<User[]> {
    const queryBuilder = new QueryBuilder(query);
    return this.prisma.user.findMany(
      queryBuilder.filter().paginate().build()
    );
  }

  @Get(':id')
  @ApiResponse({ type: BodyResponseDTO })
  async getById(@Param('id') id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id: Number(id) } });
  }

  @Put(':id')
  @ApiBody({ type: BodyUpdateRequestDTO })
  @ApiResponse({ type: BodyResponseDTO })
  async update(
    @Param('id') id: number,
    @Body() data: User,
    @Request() req: Request | any
  ): Promise<User> {
    const dbRes: User = await this.prisma.user.update({
      where: { id: Number(id) },
      data,
    });
    addDossier(req.user.id, 'Atualizou', 'Usuário', dbRes.id);
    return dbRes;
  }

  @Delete(':id')
  @ApiResponse({ type: BodyResponseDTO })
  async delete(
    @Param('id') id: number,
    @Request() req: Request | any
  ): Promise<User> {
    const dbRes: User = await this.prisma.user.delete({
      where: { id: Number(id) },
    });
    addDossier(req.user.id, 'Deletou', 'Usuário', dbRes.id);
    return dbRes;
  }
}
