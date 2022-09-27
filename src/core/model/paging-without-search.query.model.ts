import * as _ from 'lodash';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, Max, Min } from 'class-validator';
import { QueryModel } from './query.model';
import { Type } from 'class-transformer';

export class PagingWithoutFullSearchQueryModel extends QueryModel {
  @ApiProperty({ default: 1 })
  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(20)
  page: number;

  @ApiProperty({ default: 20 })
  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  @Max(100)
  @Min(1)
  limit: number;

  @ApiProperty({ required: false })
  @IsOptional()
  cursor?: string;

  @ApiProperty({ required: false })
  @Type(() => Boolean)
  @IsOptional()
  includeCursor?: boolean;

  constructor(data: PagingWithoutFullSearchQueryModel) {
    super();
    _.assign(this, data);
  }
}
