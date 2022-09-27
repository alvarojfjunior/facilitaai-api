import { ApiProperty } from '@nestjs/swagger';

export class BodyRequestDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;
}


export class BodyResponseDTO {
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
