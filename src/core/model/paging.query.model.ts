import * as _ from 'lodash';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PagingWithoutFullSearchQueryModel } from './paging-without-search.query.model';

export class PagingQueryModel extends PagingWithoutFullSearchQueryModel {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fullTextSearch?: string;

  constructor(data: PagingQueryModel) {
    super(null);
    _.assign(this, data);
  }
}
