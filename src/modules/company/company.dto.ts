import { ApiProperty } from '@nestjs/swagger';

export class BodyRequestDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  slogan: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  whatsapp: string;

  @ApiProperty()
  fone: string;
}


export class BodyResponseDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slogan: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  whatsapp: string;

  @ApiProperty()
  fone: string;
}
