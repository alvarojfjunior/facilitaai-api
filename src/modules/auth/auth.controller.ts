import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

import { AuthService } from './auth.service';
import { AuthResponseDTO, LoginUserDTO, RegisterUserDTO, ResposeUserDTO } from './auth.dto';
import { addDossier } from '../../shared/helpers/dossier.helpers';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ description: 'Login user' })
  @ApiBody({ type: LoginUserDTO })
  @ApiResponse({ type: AuthResponseDTO })
  async login(@Body() user: LoginUserDTO): Promise<AuthResponseDTO> {
    const dbRes = await this.authService.login(user);
    addDossier(dbRes.user.companyId, dbRes.user.id, 'Conectou', 'Autenticação', dbRes.user.id);
    return dbRes;
  }

  @ApiBody({ type: RegisterUserDTO })
  @ApiResponse({ type: ResposeUserDTO })
  @Post('register')
  async register(@Body() user: User): Promise<User> {
    return this.authService.register(user);
  }
}
