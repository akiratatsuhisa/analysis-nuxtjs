import jwt from 'jsonwebtoken';
import _ from 'lodash';

import { Jwt } from '@/helpers';
import { logWarn } from '@/server/utils';

const config = useRuntimeConfig();

export default defineEventHandler((event) => {
  const authHeader = getHeader(event, 'Authorization');

  event.context.user = null;

  try {
    const token = authHeader?.split(' ').at(1);
    if (!token) {
      throw 'Not Found Token';
    }

    const payload = jwt.verify(token, config.jwtSecret, {
      ignoreExpiration: false,
    });

    event.context.user = Jwt.parseUser(payload);
  } catch (error) {
    if (typeof error === 'string') {
      logWarn(event, error);
    } else {
      logWarn(event, 'Invalid Token');
    }
  }
});
