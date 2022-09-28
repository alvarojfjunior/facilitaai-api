import { ApiProperty } from '@nestjs/swagger';

export class ClientRequestDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  address?: string;

  @ApiProperty()
  phone?: string;

  @ApiProperty()
  whatsapp?: string;

  @ApiProperty()
  active: number;
}

export class ClientResponseDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  companyId: number;

  @ApiProperty()
  address: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  whatsapp: string;

  @ApiProperty()
  active: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
