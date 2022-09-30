import { ApiProperty } from '@nestjs/swagger';

export class AccessProfileRequestDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  allowed?: JSON[];
}


export class AccessProfileResponseDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  companyId: number;
  
  @ApiProperty()
  name: string;

  @ApiProperty()
  allowed?: JSON[];

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}
