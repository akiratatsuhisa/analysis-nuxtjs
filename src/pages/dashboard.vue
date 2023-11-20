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
            <dashboard-chart-a />
          </v-col>

          <v-col cols="12" md="6">
            <dashboard-chart-b />
          </v-col>
        </v-row>
      </v-responsive>
    </v-container>
  </v-main>
</template>

<script lang="ts" setup>
import { Permission } from '@/interfaces';

definePageMeta({
  name: 'Dashboard',
  permissions: [Permission.LIST_DASHBOARD],
});
</script>
