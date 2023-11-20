<template>
  <v-main class="bg-surface-container">
    <v-container
      fluid
      class="fill-height"
      :class="{ 'pa-0': $vuetify?.display.xs }"
    >
      <v-responsive
        class="bg-surface h-100 pa-4"
        :class="[$vuetify?.display.xs ? 'rounded-0' : 'rounded-lg']"
      >
        <v-row>
          <v-col cols="12" md="6">
            <v-card class="bg-surface-container-lowest" elevation="0">
              <v-card-title>{{ $t('pages.home.hello') }}</v-card-title>
            </v-card>
          </v-col>

          <v-col cols="12" md="6">
            <v-card class="bg-surface-container-lowest" elevation="0">
              <v-card-title>Test</v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-responsive>
    </v-container>
  </v-main>
</template>

<script lang="ts" setup>
import { Permission } from '@/interfaces';

definePageMeta({
  name: 'Home',
  permissions: [Permission.VIEW_HOME],
});
</script>
