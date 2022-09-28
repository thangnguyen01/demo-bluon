import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AgencyRequestTechnicianDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  type: string;
}