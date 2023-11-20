<template>
  <v-expansion-panel elevation="0">
    <v-expansion-panel-title>{{ translate('title') }}</v-expansion-panel-title>

    <v-expansion-panel-text>
      <div>__</div>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script lang="ts" setup>
const { translate } = usePageLocale({ prefix: 'settings.panels.advanced' });
</script>
