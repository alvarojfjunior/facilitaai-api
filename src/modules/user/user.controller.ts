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
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { UserService } from './user.service';
import { addDossier } from '../../shared/helpers/dossier.helpers';
import { BodyRequestDTO, BodyResponseDTO } from './user.dto';
import QueryBuilder from 'prisma-query-builder';

@UseGuards(JwtAuthGuard)
@ApiTags('users')
@Controller('users')
export class UserController {
  prisma: any;
  constructor(private userService: UserService) {}

  @Get()
  @ApiResponse({ type: [BodyResponseDTO] })
  @UseGuards(JwtAuthGuard)
  async getAll(@Query() query: any): Promise<User[]> {
    const queryBuilder = new QueryBuilder(query);
    return this.userService.users(queryBuilder.filter().paginate().build());
  }

  @Get(':id')
  @ApiResponse({ type: BodyResponseDTO })
  async getById(@Param('id') id: number): Promise<User | null> {
    return this.userService.findUser({ id: Number(id) });
  }

  @Get('free-attendant/:type')
  @ApiResponse({ type: BodyResponseDTO })
  async findAll(@Param() type: string): Promise<User[]> {
    return this.userService.getFreeAttendant(type);
  }

  @Post()
  @ApiBody({ type: BodyRequestDTO })
  @ApiResponse({ type: BodyResponseDTO })
  async signupUser(
    @Body()
    userData: User,
    @Request() req: Request | any
  ): Promise<User> {
    const dbRes: User = await this.userService.createUser(userData);
    addDossier(req.user.id, 'Inseriu', 'Usuários', dbRes.id);
    return dbRes;
  }

  @Put(':id')
  @ApiBody({ type: BodyRequestDTO })
  @ApiResponse({ type: BodyResponseDTO })
  async update(
    @Param('id') id: number,
    @Body()
    data: User,
    @Request() req: Request | any
  ): Promise<User> {
    const dbRes: User = await this.userService.updateUser({
      where: { id: Number(id) },
      data,
    });
    addDossier(req.user.id, 'Atualizou', 'Usuários', dbRes.id);
    return dbRes;
  }

  @Delete(':id')
  @ApiResponse({ type: BodyResponseDTO })
  async delete(
    @Param('id') id: number,
    @Request() req: Request | any
  ): Promise<User> {
    const dbRes: User = await this.userService.deleteUser({ id: Number(id) });
    addDossier(req.user.id, 'Deletou', 'Usuários', dbRes.id);
    return dbRes;
  }
}
