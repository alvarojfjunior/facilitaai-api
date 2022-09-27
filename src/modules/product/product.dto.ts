import { ApiProperty } from '@nestjs/swagger';

export class ProductRequestDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;
}


export class ProductResponseDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  companyId: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}
