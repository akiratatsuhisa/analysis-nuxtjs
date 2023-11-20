import dayjs from 'dayjs';
import { FilterQuery } from 'mongoose';
import { z } from 'zod';

import { Permission } from '@/interfaces';
import { defineAuthEventHandler } from '@/server/core';
import { IUserDocument, User } from '@/server/models';
import { transformQuery } from '@/server/utils';

const schema = z.object({
  search: z.string().nullish(),
  username: z.string().nullish(),
  email: z.string().nullish(),
  createdAtFrom: z.string().nullish(),
  createdAtTo: z.string().nullish(),
  permissions: z.string().array().nullish(),
  permissionMode: z
    .string()
    .nullish()
    .transform((x) => x === 'true')
    .pipe(z.boolean()),
});

export default defineAuthEventHandler(
  async (event) => {
    const query = await getValidatedQuery(event, (query) => {
      transformQuery(query);
      return schema.parse(query);
    });

    const filterQueryAnd: FilterQuery<IUserDocument>['$and'] = [];

    if (query.search) {
      const childFilterQuery = {
        $regex: '.*' + query.search + '.*',
        $options: 'i',
      };

      const filterQueryOr: FilterQuery<IUserDocument>['$or'] = [
        {
          firstName: childFilterQuery,
          lastName: childFilterQuery,
          displayName: childFilterQuery,
        },
      ];

      filterQueryAnd.push({ $or: filterQueryOr });
    }

    if (query.username) {
      filterQueryAnd.push({
        username: {
          $regex: '.*' + query.username + '.*',
          $options: 'i',
        },
      });
    }

    if (query.email) {
      filterQueryAnd.push({
        email: {
          $regex: '.*' + query.email + '.*',
          $options: 'i',
        },
      });
    }

    if (query.permissions?.length) {
      filterQueryAnd.push({
        permissions: {
          [query.permissionMode ? '$all' : '$in']: query.permissions,
        },
      });
    }

    if (query.createdAtFrom) {
      filterQueryAnd.push({
        createdAt: {
          $gte: dayjs(query.createdAtFrom).startOf('day').toDate(),
        },
      });
    }

    if (query.createdAtTo) {
      filterQueryAnd.push({
        createdAt: {
          $lte: dayjs(query.createdAtTo).endOf('day').toDate(),
        },
      });
    }

    logInfo(event, filterQueryAnd);

    const users = await User.find(
      filterQueryAnd.length ? { $and: filterQueryAnd } : {},
      {
        id: true,
        username: true,
        displayName: true,
        email: true,
        firstName: true,
        lastName: true,
        permissions: true,
        photoUrl: true,
        coverUrl: true,
      },
    );

    return users;
  },
  { permissions: [Permission.LIST_USER] },
);
