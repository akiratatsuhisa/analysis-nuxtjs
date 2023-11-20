<template>
  <v-main class="bg-surface-container">
    <v-container
      fluid
      class="fill-height text-center"
      :class="{ 'pa-0': $vuetify?.display.xs }"
    >
      <v-responsive
        class="h-100 pa-3 bg-surface d-flex align-center justify-center"
        :class="{ 'rounded-xl': $vuetify?.display.smAndUp }"
      >
        <v-icon icon="mdi-help-circle" color="info" size="128" />

        <h1 class="h1">
          <span class="text-info">404</span>
          {{ translate('title') }}
        </h1>

        <h2 class="h2 font-weight-light text-medium-emphasis">
          {{ translate('subtitle') }}
        </h2>

        <v-btn class="mt-3" :to="{ name: 'Home' }">
          {{ translate('returnToHome') }}
        </v-btn>
      </v-responsive>
    </v-container>
  </v-main>
</template>

<script lang="ts" setup>
definePageMeta({
  name: 'NotFound',
});

const { translate } = usePageLocale({
  prefix: 'common.notFound',
});
</script>
