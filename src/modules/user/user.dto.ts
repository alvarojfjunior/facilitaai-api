import { ApiProperty } from '@nestjs/swagger';

export class BodyUpdateRequestDTO {
  @ApiProperty()
  companyId: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  accessProfileId: number;
}

export class BodyResponseDTO {
  @ApiProperty()
  companyId: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  accessProfileId: number;
}
