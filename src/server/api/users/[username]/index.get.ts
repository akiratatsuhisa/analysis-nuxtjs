import { Permission } from '@/interfaces';
import { defineAuthEventHandler } from '@/server/core';
import { User } from '@/server/models';

export default defineAuthEventHandler(
  async (event) => {
    const username = getRouterParam(event, 'username');

    const user = await User.findOne(
      { username },
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

    if (!user) {
      throw createError({ statusCode: 404, message: 'Not Found' });
    }

    return user;
  },
  { permissions: [Permission.READ_USER] },
);
