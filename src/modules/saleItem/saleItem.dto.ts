import { ApiProperty } from '@nestjs/swagger';

export class SaleItemRequestDTO {
  @ApiProperty()
  type: string;

  @ApiProperty()
  saleId: number;

  @ApiProperty()
  itemId: number;

  @ApiProperty()
  initialValue: number

  @ApiProperty()
  discount: number

  @ApiProperty()
  finalValue: number
  
  @ApiProperty()
  observation: string;
}


export class SaleItemResponseDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  type: string;

  @ApiProperty()
  saleId: number;

  @ApiProperty()
  itemId: number;

  @ApiProperty()
  initialValue: number

  @ApiProperty()
  discount: number

  @ApiProperty()
  finalValue: number
  
  @ApiProperty()
  observation: string;

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}
