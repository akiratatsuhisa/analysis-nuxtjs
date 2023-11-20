<template>
  <v-main class="bg-surface-container">
    <v-container
      fluid
      class="fill-height"
      :class="{ 'pa-0': $vuetify?.display.xs }"
    >
      <v-responsive
        class="bg-surface h-100 pa-0"
        :class="[$vuetify?.display.xs ? 'rounded-0' : 'rounded-lg']"
      >
        <v-expansion-panels variant="accordion" multiple>
          <settings-profile-panel />

          <settings-theme-panel />

          <settings-language-panel />

          <settings-advanced-panel />
        </v-expansion-panels>
      </v-responsive>
    </v-container>
  </v-main>
</template>

<script lang="ts" setup>
definePageMeta({
  name: 'Settings',
});
</script>
