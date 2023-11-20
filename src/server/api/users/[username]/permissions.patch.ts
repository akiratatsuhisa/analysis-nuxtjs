import dayjs from 'dayjs';
import _ from 'lodash';
import { z } from 'zod';

import { Permission } from '@/interfaces';
import { defineAuthEventHandler } from '@/server/core';
import { User } from '@/server/models';

const schema = z.object({
  permissions: z
    .array(
      z.enum([
        Permission.VIEW_HOME,
        Permission.LIST_DASHBOARD,
        Permission.LIST_USER,
        Permission.READ_USER,
        Permission.CREATE_USER,
        Permission.UPDATE_USER,
        Permission.DELETE_USER,
        Permission.UPDATE_PERMISSIONS_USER,
      ]),
    )
    .refine((permissions) => {
      return new Set([...permissions]).size === permissions.length;
    }),
});

export default defineAuthEventHandler(
  async (event) => {
    const username = getRouterParam(event, 'username');

    const body = await readValidatedBody(event, (body) => {
      return schema.parse(body);
    });

    const user = await User.findOneAndUpdate(
      { username },
      {
        permissions: body.permissions,
        invalidTokenThreshold: dayjs().add(30, 'minutes').toDate(),
      },
      {
        new: true,
        projection: {
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
      },
    );

    if (!user) {
      throw createError({ statusCode: 404, message: 'Not Found' });
    }

    return user;
  },
  {
    permissions: [Permission.UPDATE_PERMISSIONS_USER],
  },
);
