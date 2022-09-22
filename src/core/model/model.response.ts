import { ApiProperty } from '@nestjs/swagger';
export class ResponseModel<T = any> {
  @ApiProperty()
  data: T;

  @ApiProperty()
  statusCode: string | null;

  @ApiProperty()
  message: string | null;
}
