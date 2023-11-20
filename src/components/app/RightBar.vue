<template>
  <v-navigation-drawer
    v-model="subDrawer"
    floating
    location="right"
    mobile-breakpoint="lg"
    class="bg-surface-container text-on-surface"
    :width="$route.meta.subDrawer?.width"
    :class="[
      $route.meta.subDrawer &&
      $vuetify.display[$route.meta.subDrawer.breakPoint]
        ? 'w-100'
        : 'rounded-s-xl',
    ]"
  >
    <template #prepend>
      <template v-if="$vuetify.display.mdAndDown">
        <v-list-item height="64" nav>
          <v-app-bar-title class="text-primary pa-2">
            {{ $t('common.app.title') }}
          </v-app-bar-title>

          <template #append>
            <v-btn
              variant="text"
              icon="mdi-arrow-right"
              @click="subDrawer = !subDrawer"
            />
          </template>
        </v-list-item>

        <v-divider />
      </template>
    </template>

    <component :is="subDrawerContent" />

    <template #append>
      <template
        v-if="
          $route.meta.subDrawer &&
          !$vuetify.display[$route.meta.subDrawer.breakPoint]
        "
      >
        <v-divider />
        <div class="py-3"></div>
      </template>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify';

import { useAppStore } from '@/store';

const appStore = useAppStore();
const { subDrawer, subDrawerContent } = storeToRefs(appStore);

const display = useDisplay();

watch(
  () => display.lgAndDown.value,
  (isActive) => {
    if (isActive) {
      subDrawer.value = false;
    } else {
      subDrawer.value = true;
    }
  },
  { immediate: true },
);
</script>
