import axios from 'axios';
import dayjs from 'dayjs';
import _ from 'lodash';

import { Jwt } from '@/helpers';
import type { IAuthOptions, IAuthResponse } from '@/interfaces';

export const useAuth = createSharedComposable(() => {
  const accessToken = useLocalStorage('auth:profile:accessToken', '');

  const user = computed<IdentityUser | null>(() =>
    Jwt.parseUser(accessToken.value),
  );
  const expires = computed(() => Jwt.getExpires(accessToken.value));

  function isExpires(seconds: number = 60) {
    return (
      !expires.value ||
      dayjs(expires.value).subtract(seconds, 'seconds').isBefore()
    );
  }

  const isAuthenticated = computed(() => !_.isNull(user.value));
  const identityId = computed(() => user.value?.id ?? null);

  function hasPermissions(...permissions: Array<string>) {
    return _.every(permissions, (permission) =>
      _.includes(user.value?.permissions, permission),
    );
  }

  const axiosInstacne = axios.create();

  function updateTokens(tokens: { accessToken: string }) {
    accessToken.value = tokens.accessToken;
  }

  async function getAccessTokenSilently(options: IAuthOptions = {}) {
    const { seconds } = options;

    if (!isExpires(seconds)) {
      return accessToken.value;
    }
    await nextTick();

    return accessToken.value;
  }

  async function getUserSilently(options?: IAuthOptions) {
    if (isExpires(options?.seconds)) {
      await getAccessTokenSilently(options);
    }

    return user.value;
  }

  async function logout() {
    await nextTick();

    updateTokens({
      accessToken: '',
    });
  }

  async function oauthLogin({ params }: { params?: Record<string, any> }) {
    const { data } = await axiosInstacne.get<IAuthResponse>(`/api/callback`, {
      params,
    });

    updateTokens(data);
  }

  const fullName = computed(() =>
    _.trim(`${user.value?.lastName ?? ''} ${user.value?.firstName ?? ''}`),
  );

  // async function requestImageByType(username: string, type: 'photo' | 'cover') {
  //   return axiosInstacne
  //     .request<string>({
  //       url: `/profileUsers/${username}/${type}`,
  //     })
  //     .then((data) => data.data)
  //     .catch(() => (type === 'photo' ? NO_AVATAR_URL : NO_BACKGROUND_URL));
  // }

  // const photoUrl = computedAsync(async () => {
  //   if (!user.value || !user.value?.photoUrl) {
  //     return NO_AVATAR_URL;
  //   }

  //   if (cacheImages.photo.url === user.value.photoUrl) {
  //     return await cacheImages.photo.promise;
  //   }

  //   cacheImages.photo = {
  //     url: user.value.photoUrl,
  //     promise: requestImageByType(user.value.username, 'photo'),
  //   };
  //   return await cacheImages.photo.promise;
  // }, NO_AVATAR_URL);
  // const coverUrl = computedAsync(async () => {
  //   if (!user.value || !user.value?.coverUrl) {
  //     return NO_BACKGROUND_URL;
  //   }

  //   if (cacheImages.cover.url === user.value.coverUrl) {
  //     return await cacheImages.cover.promise;
  //   }

  //   cacheImages.cover = {
  //     url: user.value.coverUrl,
  //     promise: requestImageByType(user.value.username, 'cover'),
  //   };
  //   return await cacheImages.cover.promise;
  // }, NO_BACKGROUND_URL);

  return {
    isAuthenticated,
    expires,
    user,
    identityId,
    hasPermissions,
    logout,
    oauthLogin,
    updateTokens,
    getAccessTokenSilently,
    getUserSilently,
    fullName,
    // photoUrl,
    // coverUrl,
  };
});

export type ProviderType = 'google';

export interface IUseOauth {
  prompt?: MaybeRef<'consent' | 'select_account'>;
}

export function useOauth(options: IUseOauth = {}) {
  const { prompt } = options;

  const config = useRuntimeConfig();

  const route = useRoute();

  const providers = reactive<
    Record<ProviderType, { name: string; image: string }>
  >({
    google: { name: 'google', image: '/logos/google.svg' },
  });

  async function getState() {
    return {
      redirectUrl: _.isArray(route.query.redirectUrl)
        ? _.get(route.query.redirectUrl, '0', '/')
        : (route.query.redirectUrl as string) ?? '/',
    };
  }

  async function challenge(rootUrl: string, options: Record<string, string>) {
    options.state = JSON.stringify(await getState());

    const qs = new URLSearchParams(options);
    const link = `${rootUrl}?${qs.toString()}`;
    window.location.href = link;
  }

  function challengeGoogleOauth() {
    const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;
    const options: Record<string, string> = {
      client_id: config.public.googleClientId,
      redirect_uri: config.public.googleRedirectUri,
      access_type: 'offline',
      response_type: 'code',
      scope: [
        'openid',
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ].join(' '),
    };

    if (prompt) {
      options.prompt = unref(prompt) as string;
    }

    challenge(rootUrl, options);
  }

  return {
    providers,
    challengeGoogleOauth,
  };
}
