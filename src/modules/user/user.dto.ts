import { ApiProperty } from '@nestjs/swagger';

export class BodyUpdateRequestDTO {
  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  accessProfileId: number;
}

export class BodyResponseDTO {
  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  accessProfileId: number;

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}
