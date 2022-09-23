import { ApiProperty } from '@nestjs/swagger';

export class BodyResponseDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  actionType: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  identifier: number;

  @ApiProperty()
  timestamp: unknown;
}
