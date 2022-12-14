import { ApiProperty } from '@nestjs/swagger';

export class ProductRequestDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  active?: number;

  @ApiProperty()
  stock: number;
}


export class ProductResponseDTO {
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
