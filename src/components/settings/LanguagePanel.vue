<template>
  <v-expansion-panel elevation="0">
    <v-expansion-panel-title>{{ translate('title') }}</v-expansion-panel-title>

    <v-expansion-panel-text>
      <div class="d-grid ga-2">
        <div
          v-for="(detail, language) in languages"
          :key="language"
          :value="language"
          @click="selectedLanguage = language"
          class="cursor-pointer"
        >
          <v-avatar
            v-ripple="true"
            :color="
              isActiveLanguage(language) ? 'tertiary' : 'tertiary-container'
            "
          >
            <v-avatar size="34" :image="detail.image" />
          </v-avatar>

          <span
            class="ml-3"
            :class="{ 'text-tertiary': isActiveLanguage(language) }"
          >
            {{ $t(`common.languages.${detail.name}`) }}
          </span>
        </div>
      </div>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script lang="ts" setup>
const { translate } = usePageLocale({ prefix: 'settings.panels.language' });

const { selectedLanguage, languages, isActiveLanguage } = useLanguageStorage();
</script>
