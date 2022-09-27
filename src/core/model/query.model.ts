import * as _ from 'lodash';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { SortType } from '../constants/sort-type.constant';
import { Transform, Type } from 'class-transformer';

export class QueryModel {
  [index: string]: any;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  createdAtFrom?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  createdAtTo?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiPropertyOptional({ enum: [SortType.ASC, SortType.DESC] })
  @IsOptional()
  @IsEnum([SortType.ASC, SortType.DESC])
  sortType?: SortType;

  fields?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  @Transform(params => _.split(params.value, ','))
  ids?: string[];

  constructor(data = null, toNumberFields: string[] = []) {
    if (data) {
      _.forEach(toNumberFields, (field) => {
        if (data[field]) {
          data[field] = parseInt(data[field]);
        }
      });
    }
    _.assign(this, data);
  }
}
