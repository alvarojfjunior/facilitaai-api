import { ApiProperty } from '@nestjs/swagger';

export class InvoiceRequestDTO {
  @ApiProperty()
  description?: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  closed?: number;

  @ApiProperty()
  value: number;

  @ApiProperty()
  clientId: number;

  @ApiProperty()
  date: Date;
}


export class InvoiceResponseDTO {
  @ApiProperty()
  description?: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  closed: number;

  @ApiProperty()
  value: number;

  @ApiProperty()
  clientId: number;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  updatedAt: Date
}
