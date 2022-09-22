import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { applyDecorators, Type } from '@nestjs/common';
import { ResponseModel } from 'src/core/model/model.response';

export const ApiOkModelResponse = <TModel extends Type<any>>(
  options: { type: TModel, description?: string, isArray?: boolean },
) => {
  let type = null;
  switch (options.type.name) {
    case 'Boolean':
      type = 'boolean';
      break;

    case 'Number':
      type = 'number';
      break;

    case 'String':
      type = 'string';
      break;
  }
  return applyDecorators(
    ApiOkResponse({
      schema: {
        title: `${options.type.name}OkModelResponse`,
        allOf: [
          { $ref: getSchemaPath(ResponseModel) },
          {
            properties: {
              data: options.isArray
                ? {
                  type: 'array',
                  items: type ? { type } : { $ref: getSchemaPath(options.type) }
                }
                : (type ? { type } : { $ref: getSchemaPath(options.type) }),
            },
          },
        ],
      },
      description: options.description || null,
    }),
  );
};
