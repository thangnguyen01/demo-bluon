import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TechnicianApproveRequestDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  requesterId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  type: string;
}