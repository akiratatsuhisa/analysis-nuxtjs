<template>
  <v-container v-if="!isError" class="fill-height">
    <v-row>
      <v-col class="mx-auto" md="6" lg="4">
        <v-card class="bg-surface" variant="flat" rounded="xl">
          <v-card-title>{{ translate('title') }}</v-card-title>

          <v-card-subtitle class="text-wrap">
            {{ translate('callbackSubtitle') }}
          </v-card-subtitle>

          <v-card-text class="text-center">
            <v-progress-circular
              indeterminate
              color="primary"
              size="80"
              width="8"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <v-container v-else class="fill-height">
    <v-row>
      <v-col class="mx-auto" md="6" lg="4">
        <v-card class="bg-surface" variant="flat" rounded="xl">
          <v-card-title>{{ translate('title') }}</v-card-title>

          <v-card-subtitle class="text-wrap">
            {{ translate('errorSubtitle') }}
          </v-card-subtitle>

          <v-card-text>
            <v-btn
              type="submit"
              variant="flat"
              block
              class="mb-3"
              :to="{ name: 'Login' }"
            >
              {{ translate('loginLink') }}
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import _ from 'lodash';

import { Oauth } from '@/helpers';

definePageMeta({
  name: 'Callback',
  layout: 'auth',
  unauth: true,
});

const { translate } = usePageLocale({ prefix: 'callback' });

const route = useRoute();
const { oauthLogin } = useAuth();

const isError = ref(false);

onMounted(async () => {
  try {
    await oauthLogin({
      params: route.query,
    });
    const { redirectUrl } = Oauth.parseState(route.query.state) ?? {};

    navigateTo(
      typeof redirectUrl === 'string' && redirectUrl.length
        ? { path: redirectUrl, replace: true }
        : { name: 'Home', replace: true },
    );
  } catch (error) {
    isError.value = true;
  }
});
</script>
