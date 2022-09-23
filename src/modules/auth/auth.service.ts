import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AuthHelpers } from '../../shared/helpers/auth.helpers';
import { GLOBAL_CONFIG } from '../../configs/global.config';

import { AuthResponseDTO, LoginUserDTO, RegisterUserDTO, ResposeUserDTO } from './auth.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  @ApiBody({ type: LoginUserDTO })
  @ApiResponse({ type: AuthResponseDTO })
  public async login(loginUserDTO: LoginUserDTO): Promise<AuthResponseDTO> {
    const userData = await this.prisma.user.findUnique({
      where: { email: loginUserDTO.email },
    });

    if (!userData) {
      throw new UnauthorizedException();
    }

    const isMatch = await AuthHelpers.verify(
      loginUserDTO.password,
      userData.password
    );

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload: any = {
      id: userData.id,
      companyId: 1,
      name: userData.name,
      email: userData.email,
      accessProfileId: userData.accessProfileId,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: GLOBAL_CONFIG.security.expiresIn,
    });

    return {
      user: userData,
      accessToken: accessToken,
    };
  }

  //Cadastrar a empresa também
  @ApiBody({ type: RegisterUserDTO })
  @ApiResponse({ type: ResposeUserDTO })
  public async register(data: User): Promise<User> {
    return this.prisma.user.create({ data });
  }
}
