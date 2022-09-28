import { ApiProperty } from '@nestjs/swagger';

export class ServiceRequestDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  active?: number;
}


export class ServiceResponseDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  companyId: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  active: number;

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}
