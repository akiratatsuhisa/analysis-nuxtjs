import dayjs from 'dayjs';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

import { Jwt } from '@/helpers';
import { logWarn } from '@/server/utils';

import { User } from '../models';

const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'Authorization');

  event.context.user = null;

  try {
    const token = authHeader?.split(' ').at(1);
    if (!token) {
      throw 'Not Found Token';
    }

    const payload = jwt.verify(token, config.jwtSecret, {
      ignoreExpiration: false,
    }) as jwt.JwtPayload;

    const expiresAt = dayjs(payload.exp! * 1000);

    const user = await User.findOne(
      {
        username: payload.username,
        invalidTokenThreshold: { $gte: expiresAt.toDate() },
      },
      { username: true, invalidTokenThreshold: true },
    );

    if (user) {
      throw `Invalid Token Threshold (${user.invalidTokenThreshold?.toISOString()}) >= Expires At (${expiresAt.toISOString()})`;
    }

    event.context.user = Jwt.parseUser(payload);
  } catch (error) {
    if (typeof error === 'string') {
      logWarn(event, error);
    } else {
      logWarn(event, 'Invalid Token');
    }
  }
});
