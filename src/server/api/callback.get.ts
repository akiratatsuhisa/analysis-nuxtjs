import jwt from 'jsonwebtoken';
import _ from 'lodash';

import { Jwt } from '@/helpers';
import { Permission } from '@/interfaces';
import { IUser, User } from '@/server/models';
import { logError } from '@/server/utils';

const config = useRuntimeConfig();

export function generateAccessToken(user: IUser) {
  return jwt.sign(
    _.pick(user, [
      'username',
      'displayName',
      'email',
      'emailConfirmed',
      'firstName',
      'lastName',
      'permissions',
      'photoUrl',
      'coverUrl',
    ]),
    config.jwtSecret,
    {
      subject: user.googleSub,
      expiresIn: `${config.jwtExpires}m`,
    },
  );
}

function generateUsername(id: string) {
  return `google:${id}`;
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  try {
    const data = await $fetch<{
      access_token: string;
      refresh_token: string;
      id_token: string;
    }>('https://oauth2.googleapis.com/token', {
      method: 'POST',
      body: {
        client_id: config.googleClientId,
        client_secret: config.googleClientSecret,
        redirect_uri: config.googleRedirectUri,
        grant_type: 'authorization_code',
        code: query.code,
      },
    });

    const googleProfile = Jwt.parseGoogleUser(data['id_token']);

    if (!googleProfile) {
      throw new Error('Cannot parse google profile');
    }

    const userInDb = await User.findOne({ googleSub: googleProfile.id });

    if (userInDb) {
      userInDb.googleRefreshToken = data['refresh_token'];
      userInDb.displayName = googleProfile.displayName!;
      userInDb.email = googleProfile.email!;
      userInDb.emailConfirmed = googleProfile.emailConfirmed!;
      userInDb.firstName = googleProfile.firstName ?? undefined;
      userInDb.lastName = googleProfile.lastName ?? undefined;
      userInDb.photoUrl = googleProfile.photoUrl ?? undefined;
      await userInDb.save();

      logInfo(event, `User(${userInDb.username}) Logged In`);
      return { accessToken: generateAccessToken(userInDb) };
    }

    const user = await User.create({
      googleSub: googleProfile.id,
      googleRefreshToken: data['refresh_token'],
      username: generateUsername(googleProfile.id!),
      displayName: googleProfile.displayName,
      email: googleProfile.email,
      emailConfirmed: googleProfile.emailConfirmed,
      firstName: googleProfile.firstName,
      lastName: googleProfile.lastName,
      permissions: [
        Permission.VIEW_HOME,
        Permission.LIST_USER,
        Permission.READ_USER,
      ],
      photoUrl: googleProfile.photoUrl,
      coverUrl: undefined,
    });

    logInfo(event, `User(${user.username}) Logged In`);
    return {
      accessToken: generateAccessToken(user),
    };
  } catch (error) {
    logError(event, error);
    throw createError({ statusCode: 401, statusMessage: 'Unanthenticated' });
  }
});
