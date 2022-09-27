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
import { UserUpdateRequestDTO, UserResponseDTO } from './user.dto';
import QueryBuilder from 'prisma-query-builder';
import { TResponseUser } from './user.types';

@UseGuards(JwtAuthGuard)
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @ApiResponse({ type: [UserResponseDTO] })
  async getAll(
    @Query() query: any,
    @Request() req: Request | any
  ): Promise<User[]> {
    const queryBuilder = new QueryBuilder(query);
    const apiRes: User[] = await this.prisma.user.findMany({
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
  @ApiResponse({ type: UserResponseDTO })
  async getById(@Param('id') id: number): Promise<User | null> {
    const apiRes: any = await this.prisma.user.findUnique({
      where: { id: Number(id) },
    });
    delete apiRes.password;
    return apiRes;
  }

  @Put(':id')
  @ApiBody({ type: UserUpdateRequestDTO })
  @ApiResponse({ type: UserResponseDTO })
  async update(
    @Param('id') id: number,
    @Body() data: User,
    @Request() req: Request | any
  ): Promise<TResponseUser> {
    const apiRes: any = await this.prisma.user.update({
      where: { id: Number(id) },
      data,
    });
    addDossier(req.user.id, 'Atualizou', 'Usuário', apiRes.id);
    delete apiRes.password;
    return apiRes;
  }

  @Post()
  @ApiBody({ type: UserUpdateRequestDTO })
  @ApiResponse({ type: UserResponseDTO })
  async create(
    @Body() data: User,
    @Request() req: Request | any
  ): Promise<TResponseUser> {
    data.password =
      'ae8fb6dc49b8d11f:676e5b99fd3760d88ba5be1cb92fa1cce6f8080cb616dd5baaf09b2e9a4abb5298e6d2aa86a9f7e9c2c6dfebcc3ed2e87b869f99a7a43fa7b7e69ef8ead3c68c';
    const apiRes: any = await this.prisma.user.create({
      data,
    });
    addDossier(req.user.id, 'Cadastrou', 'Usuário', apiRes.id);
    delete apiRes.password;
    return apiRes;
  }

  @Delete(':id')
  @ApiResponse({ type: UserResponseDTO })
  async delete(
    @Param('id') id: number,
    @Request() req: Request | any
  ): Promise<TResponseUser> {
    const apiRes: any = await this.prisma.user.delete({
      where: { id: Number(id) },
    });
    addDossier(req.user.id, 'Deletou', 'Usuário', apiRes.id);
    delete apiRes.password;
    return apiRes;
  }
}
