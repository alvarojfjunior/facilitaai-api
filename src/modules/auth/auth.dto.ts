import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { INVALID_EMAIL } from '../../shared/constants/strings';

export class AuthResponseDTO {
  @ApiProperty()
  user: User;

  @ApiProperty()
  accessToken: string;
}

export class RegisterUserDTO {
  @ApiProperty()
  companyId: number;

  @ApiProperty()
  email: string;
  
  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  accessProfileId: number; 
}

export class LoginUserDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: INVALID_EMAIL })
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}


export class ResposeUserDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  companyId: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  accessProfileId: number;
}
