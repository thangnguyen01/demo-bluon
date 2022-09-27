import * as _ from 'lodash';
import { BaseModel } from './base.model';
import { Document } from 'mongoose';
import { FilterQuery, Model, QueryOptions } from 'mongoose';
import { PagingModel } from '../model/paging.model';
import { PagingQueryModel } from '../model/paging.query.model';
import { PagingWithoutFullSearchQueryModel } from '../model/paging-without-search.query.model';
import { QueryModel } from '../model/query.model';
import { SortBy } from '../constants/sort-by.constant';
import { SortType } from '../constants/sort-type.constant';

export abstract class BaseRepository<DocType extends Document, ModelType extends BaseModel>{

  model: Model<DocType>;
  sortBy: SortBy;
  sortType: SortType;

  constructor() {
    this.sortBy = this.sortBy || SortBy.ID;
    this.sortType = this.sortType || SortType.DESC;
  }

  protected _remakeQuery(query: QueryModel | PagingQueryModel) {
    if (query.fullTextSearch) {
      query['$text'] = { $search: query.fullTextSearch };
    }

    if (query.createdAtFrom) {
      query['createdAt'] = { $gte: query.createdAtFrom };
    }

    if (query.createdAtTo) {
      query['createdAt'] = _.assignIn(query['createdAt'] || {}, { $lte: query.createdAtTo });
    }

    if (query.ids) {
      const ids = query.ids.filter(id => id);
      if (ids.length) {
        query['_id'] = {
          $in: ids,
        };
      }
    }
    query.sortBy = query.sortBy || this.sortBy;
    query.sortType = query.sortType || this.sortType;
    if (query.cursor) {
      query.page = 1;
      if (query.sortType === SortType.DESC) {
        if (query.includeCursor) {
          query[query.sortBy] = { $lte: query.cursor };
        } else {
          query[query.sortBy] = { $lt: query.cursor };
        }
      } else {
        if (query.includeCursor) {
          query[query.sortBy] = { $gte: query.cursor };
        } else {
          query[query.sortBy] = { $gt: query.cursor };
        }
      }
    }

    return _.omitBy(
      query,
      (value, key) =>
        _.isUndefined(value)
        || value === ''
        || [
          'fields',
          'fullTextSearch',
          'createdAtFrom',
          'createdAtTo',
          'page',
          'limit',
          'sortBy',
          'sortType',
          'ids',
          'cursor',
          'includeCursor',
        ].includes(key),
    ) as FilterQuery<DocType>;
  }

  convertFlatToStructure<T extends { parentId?: string; _id?: string; children?: T[] }>(
    records: T[],
    containParentId = true,
  ) {
    _.forEach(records, x => {
      const parent = _.find(records, y => y._id.toString() === x.parentId);
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push(x);
      }
    });

    const flatResults = _.filter(records, x => !x.parentId);

    if (!containParentId) {
      const childrenResults = _.filter(records, x => !!x.parentId);
      _.forEach(childrenResults, x => {
        delete x.parentId;
      });
    }

    return flatResults;
  }

  async insert<T extends ModelType>(data: ModelType) {
    data.createdAt = data.updatedAt = Date.now();
    return (await this.model.create(data)).toJSON<T>()
  }

  async insertMany<T extends ModelType>(items: ModelType[]) {
    if (!items.length) {
      return [];
    }
    items.forEach(data => {
      data.createdAt = data.updatedAt = Date.now();
    });
    const createdItems = await this.model.create(items);
    return createdItems.map(item => item.toJSON<T>());
  }

  async findById<T extends ModelType>(_id: string, fields: string[] = []) {
    return await this.model.findById(_id)
      .select(fields)
      .lean<T>().exec();
  }

  async find<T extends ModelType>(query = new QueryModel()) {
    const newQuery = this._remakeQuery(query);
    const fields = this.convertStringToArray(query.fields);

    return await this.model.findOne(newQuery).select(fields)
      .lean<T>().exec();
  }

  async findByIdAndUpdate<T extends ModelType>(id: string, data: any, options: QueryOptions = {}) {
    data.$setOnInsert = data.$setOnInsert || {};
    data.$setOnInsert = { ...data.$setOnInsert, createdAt: Date.now() };
    return await this.model.findByIdAndUpdate(
      id,
      { ...data, updatedAt: Date.now() },
      { new: true, ...options },
    ).lean<T>();
  }

  async findOneAndUpdate<T extends ModelType>(query: QueryModel, data: any, options: QueryOptions = {}) {
    const newQuery = this._remakeQuery(query);
    data.$setOnInsert = data.$setOnInsert || {};
    data.$setOnInsert = { ...data.$setOnInsert, createdAt: Date.now() };
    return await this.model.findOneAndUpdate(
      newQuery,
      { ...data, updatedAt: Date.now() },
      { new: true, ...options },
    ).lean<T>();
  }

  async findByIdAndDelete<T extends ModelType>(id: string) {
    return await this.model.findByIdAndDelete(id).lean<T>();
  }

  async findOneAndDelete<T extends ModelType>(query: QueryModel) {
    const newQuery = this._remakeQuery(query);
    return await this.model.findOneAndDelete(newQuery).lean<T>();
  }

  async findOrCreate<T extends ModelType>(query: any, data: ModelType) {
    const newQuery = this._remakeQuery(query);
    return (await this.find(newQuery)) || (await this.insert<T>(data));
  }

  async list<T extends ModelType>(query: QueryModel) {
    const newQuery = this._remakeQuery(query);
    const fields = this.convertStringToArray(query.fields);
    return await this.model.find(newQuery, fields, null)
      .sort(this.determineSort(query))
      .lean<T[]>()
      .exec();
  }

  protected convertStringToArray(data: string | string[], separator = ',') {
    let returnValues: string[] = [];
    if (data) {
      if (_.isString(data)) {
        returnValues = _.split(data, separator);
      } else if (_.isArray(data)) {
        returnValues = data as string[];
      }
    }

    return returnValues;
  }

  protected convertArrayToObjectFields(items: string[]) {
    const data: { [key: string]: boolean } = {};
    items.forEach(item => data[item] = true)
    return data;
  }

  protected determineSort(query: QueryModel) {
    return { [query.sortBy]: query.sortType === SortType.ASC ? SortType.ASC : SortType.DESC };
  }

  async paginate<T extends ModelType>(query: PagingQueryModel) {
    query = new PagingQueryModel(query);
    const fields = this.convertStringToArray(query.fields);
    const newQuery = this._remakeQuery(query);
    const data = await this.model.find(newQuery, fields)
      .sort(this.determineSort(query))
      .skip(_.max([0, (query.page - 1) * query.limit]))
      .limit(query.limit)
      .lean<T[]>()
      .exec();
    const total = await this.model.countDocuments(newQuery).exec();
    return new PagingModel(data, total, query.page, query.limit);
  }

  async paginateAggregation<T>(pipelines: any[] = [], query: PagingQueryModel | PagingWithoutFullSearchQueryModel) {
    const pipelinesCount = _.cloneDeep(pipelines);
    pipelinesCount.push({ $count: 'total' })
    const fields = this.convertStringToArray(query.fields);
    pipelines.push({ $sort: this.determineSort(query) });
    if (fields && fields.length) {
      pipelines.push({ $project: this.convertArrayToObjectFields(fields) });
    }
    const [data, count] = await Promise.all([
      this.model.aggregate(pipelines)
        .skip(_.max([0, (query.page - 1) * query.limit]))
        .limit(query.limit)
        .exec(),
      this.model.aggregate(pipelinesCount).exec()
    ]);

    return new PagingModel<T>(data, count.length ? count[0].total : 0, query.page, query.limit);
  }

  async update(id: string, data: any, options?: QueryOptions) {
    return await this.updateOne({ _id: id }, data, options);
  }

  async updateOne(conditions: any, data: any, options?: QueryOptions) {
    if (data.updatedAt === null) {
      delete data.updatedAt;
    } else {
      data.updatedAt = Date.now();
    }
    const result = await this.model.updateOne(conditions, data, options).exec();

    return result.matchedCount > 0;
  }

  async updateMany(conditions: any, data: any, options?: QueryOptions) {
    if (data.updatedAt === null) {
      delete data.updatedAt;
    } else {
      data.updatedAt = Date.now();
    }
    const result = await this.model.updateMany(conditions, data, options).exec();

    return result.matchedCount > 0;
  }

  async deleteOne(conditions: any) {
    const result = await this.model.deleteOne(conditions).exec();
    return result.deletedCount > 0;
  }

  async deleteMany(conditions: any) {
    const result = await this.model.deleteMany(conditions).exec();
    return result.deletedCount > 0;
  }

  async count(condition: any): Promise<number> {
    return (await this.model.countDocuments(condition).exec()) || 0;
  }
}