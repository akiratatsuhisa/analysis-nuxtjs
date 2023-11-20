<template>
  <v-app-bar
    class="text-on-surface"
    :class="[
      isTopbarElevation
        ? 'bg-surface-container-highest'
        : 'bg-surface-container',
    ]"
  >
    <v-app-bar-nav-icon @click="mainDrawer = !mainDrawer">
      <v-fab-transition mode="out-in">
        <v-icon icon="mdi-menu-open" v-if="mainDrawer" />
        <v-icon icon="mdi-menu" v-else />
      </v-fab-transition>
    </v-app-bar-nav-icon>

    <v-app-bar-title class="cursor-pointer prevent-select">
      {{ $t('common.app.title') }}
    </v-app-bar-title>

    <app-loading />

    <app-profile-menu />

    <v-app-bar-nav-icon
      v-if="route.meta.subDrawer"
      @click="subDrawer = !subDrawer"
    >
      <v-fab-transition mode="out-in">
        <v-icon icon="mdi-menu-open" v-if="subDrawer" />
        <v-icon icon="mdi-menu" v-else />
      </v-fab-transition>
    </v-app-bar-nav-icon>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store';

const route = useRoute();

const appStore = useAppStore();
const { mainDrawer, subDrawer } = storeToRefs(appStore);

const { isTopbarElevation } = useScrollBehavior();
</script>
