import { ApiProperty } from '@nestjs/swagger';

export class SaleRequestDTO {
  @ApiProperty()
  observation: string;

  @ApiProperty()
  canceled: number;

  @ApiProperty()
  amount: number;
}


export class SaleResponseDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  observation: string;

  @ApiProperty()
  canceled: number;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}
