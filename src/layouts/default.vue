<template>
  <v-app>
    <app-left-bar v-if="$vuetify.display.mdAndDown" />

    <app-right-bar v-if="$route.meta.subDrawer && $vuetify.display.mdAndDown" />

    <app-top-bar />

    <app-left-bar v-if="$vuetify.display.lgAndUp" />

    <slot />
  </v-app>
</template>
