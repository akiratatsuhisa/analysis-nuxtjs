<template>
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <v-snackbars-container />
</template>

<script lang="ts" setup>
import { useTitle } from '@vueuse/core';

const { t } = useLayoutLocale({ prefix: 'default' });

useTitle(computed(() => t('common.app.title')));
</script>
