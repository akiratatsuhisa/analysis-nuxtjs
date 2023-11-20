<template>
  <v-container class="fill-height">
    <v-row>
      <v-col class="mx-auto" md="6" lg="4">
        <v-card class="bg-surface" variant="flat" rounded="xl">
          <v-card-title>
            {{ translate('title') }}
          </v-card-title>
          <v-card-subtitle class="text-wrap">
            {{ translate('subtitle') }}
          </v-card-subtitle>
          <v-card-text>
            <div>
              <v-divider />

              <v-btn
                v-for="(detail, provider) in providers"
                :key="provider"
                variant="flat"
                color="tertiary"
                block
                class="my-3 btn-social"
                @click="challengeGoogleOauth"
              >
                <template #prepend>
                  <v-avatar size="30" color="white">
                    <v-avatar :image="detail.image" size="24" rounded="0" />
                  </v-avatar>
                </template>
                {{ $t(`common.providers.${detail.name}`) }}
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import _ from 'lodash';

definePageMeta({
  layout: 'auth',
  name: 'Login',
  unauth: true,
});

const { translate } = usePageLocale({
  prefix: 'login',
});

const { providers, challengeGoogleOauth } = useOauth();
</script>
