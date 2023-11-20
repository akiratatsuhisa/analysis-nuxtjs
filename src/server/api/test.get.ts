import { Permission } from '@/interfaces';
import { defineAuthEventHandler } from '@/server/core';
import { logInfo } from '@/server/utils';

export default defineAuthEventHandler(
  async (event) => {
    logInfo(event, { message: 'hello' });
    return { event: 'hello' };
  },
  { permissions: [Permission.LIST_USER] },
);
