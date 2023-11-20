<template>
  <v-expansion-panel elevation="0">
    <v-expansion-panel-title>{{ translate('title') }}</v-expansion-panel-title>

    <v-expansion-panel-text>
      <div class="d-grid ga-2">
        <div
          v-for="(detail, mode) in themeModes"
          :key="mode"
          :value="mode"
          @click="selectedThemeMode = mode"
          class="cursor-pointer"
        >
          <v-avatar
            :color="isActiveThemeMode(mode) ? 'tertiary' : 'tertiary-container'"
          >
            <v-icon :icon="detail.icon" />
          </v-avatar>

          <span
            class="ml-3"
            :class="{ 'text-tertiary': isActiveThemeMode(mode) }"
          >
            {{ $t(`common.themes.${detail.name}`) }}
          </span>
        </div>
      </div>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script lang="ts" setup>
const { translate } = usePageLocale({ prefix: 'settings.panels.theme' });

const { themeModes, selectedThemeMode, isActiveThemeMode } =
  useThemeModeStorage();
</script>
