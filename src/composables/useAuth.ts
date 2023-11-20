import axios, { type AxiosRequestConfig } from 'axios';
import dayjs from 'dayjs';
import _ from 'lodash';

import { Jwt } from '@/helpers';
import type { IAuthOptions, IAuthResponse } from '@/interfaces';

// const NO_AVATAR_URL = '/images/no-avatar.png';
// const NO_BACKGROUND_URL = '/images/no-background.png';

export const useAuth = createSharedComposable(() => {
  // const cacheImages: Record<
  //   'photo' | 'cover',
  //   | { url: string; promise: Promise<string> }
  //   | { url: null; promise: undefined }
  // > = {
  //   photo: { url: null, promise: undefined },
  //   cover: { url: null, promise: undefined },
  // };

  const accessToken = useLocalStorage('auth:profile:accessToken', '');
  const refreshToken = useLocalStorage('auth:profile:refreshToken', '');

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
    return _.some(permissions, (permission) =>
      _.includes(user.value?.permissions, permission),
    );
  }

  const axiosInstacne = axios.create();

  function updateTokens(tokens: { accessToken: string; refreshToken: string }) {
    // clear cache images
    // cacheImages.cover = {
    //   url: null,
    //   promise: undefined,
    // };
    // cacheImages.photo = {
    //   url: null,
    //   promise: undefined,
    // };

    accessToken.value = tokens.accessToken;
    refreshToken.value = tokens.refreshToken;
  }

  async function fetchAccessToken() {
    try {
      const { data } = await axiosInstacne.request<IAuthResponse>({
        url: '/refreshToken',
        method: 'POST',
        headers: {
          ['Refresh-Token']: refreshToken.value,
        },
      });

      updateTokens(data);
    } catch (error) {
      updateTokens({
        accessToken: '',
        refreshToken: '',
      });
    }
  }

  const isFetchingAccessToken = ref(false);

  async function getAccessTokenSilently(options?: IAuthOptions) {
    const { seconds } = options ?? {};

    if (!isExpires(seconds)) {
      return accessToken.value;
    }

    if (!isFetchingAccessToken.value) {
      console.debug('auth:fetching access token');
      try {
        isFetchingAccessToken.value = true;
        await fetchAccessToken();
      } finally {
        await nextTick();
        isFetchingAccessToken.value = false;
      }
    } else {
      // wait until fetch access token completed
      console.debug('auth:waiting access token');
      while (isFetchingAccessToken.value) {
        await new Promise((resolve) => _.delay(resolve, 200));
      }
      console.debug('auth:waiting access token completed');
    }

    return accessToken.value;
  }

  async function getUserSilently(options?: IAuthOptions) {
    if (isExpires(options?.seconds)) {
      await getAccessTokenSilently(options);
    }

    return user.value;
  }

  async function logout(config?: AxiosRequestConfig) {
    try {
      await axiosInstacne.request<IAuthResponse>({
        url: '/refreshToken',
        method: 'PATCH',
        data: {
          value: refreshToken.value,
        },
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
        ...config,
      });
    } catch (error: any) {
      console.error(error);
    } finally {
      updateTokens({
        accessToken: '',
        refreshToken: '',
      });
    }
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
    fetchAccessToken,
    getAccessTokenSilently,
    getUserSilently,
    fullName,
    // photoUrl,
    // coverUrl,
  };
});

export type ProviderType = 'google';

export function useOauth() {
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
    const options = {
      client_id: config.public.googleClientId,
      redirect_uri: config.public.googleRedirectUri,
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'openid',
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ].join(' '),
    };

    challenge(rootUrl, options);
  }

  return {
    providers,
    challengeGoogleOauth,
  };
}
