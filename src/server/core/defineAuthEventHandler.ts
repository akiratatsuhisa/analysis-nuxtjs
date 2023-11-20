import { EventHandler, EventHandlerRequest, EventHandlerResponse } from 'h3';
import _ from 'lodash';

import { Permission } from '@/interfaces';

import { logError } from '../utils';

export const defineAuthEventHandler = <
  Request extends EventHandlerRequest = EventHandlerRequest,
  Response extends EventHandlerResponse = EventHandlerResponse,
>(
  handler: EventHandler<Request, Response>,
  options?: {
    permissions?: Array<Permission>;
  },
): EventHandler<Request, Response> => {
  handler.__is_handler__ = true;

  const { permissions: authPermissions } = options ?? {};

  return eventHandler((event) => {
    if (!event.context.user) {
      logError(event, 'Unauthenticated');
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthenticated',
      });
    }

    if (
      authPermissions &&
      !_.every(authPermissions, (permission) =>
        _.includes(event.context.user?.permissions, permission),
      )
    ) {
      logError(event, 'Unauthorized');
      throw createError({
        statusCode: 403,
        statusMessage: 'Unauthorized',
      });
    }

    return handler(event);
  });
};
