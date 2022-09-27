import { ApiProperty } from '@nestjs/swagger';

export class CompanyRequestDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  slogan: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  whatsapp: string;

  @ApiProperty()
  phone: string;
}


export class CompanyResponseDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slogan: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  whatsapp: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}
