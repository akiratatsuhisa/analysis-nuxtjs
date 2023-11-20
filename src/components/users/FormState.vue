<template>
  <v-card
    class="bg-surface"
    :rounded="$vuetify.display.lgAndDown ? '0' : 'lg'"
    elevation="0"
    :style="{
      height: $vuetify.display.lgAndDown ? '100%' : '',
    }"
  >
    <template #prepend>
      <v-icon icon="mdi-form-select" color="primary" />
    </template>

    <template #title>
      {{ translate('title') }}
    </template>

    <v-card-subtitle class="text-wrap">
      {{ translate(`subtitle.${state}`) }}
    </v-card-subtitle>

    <v-card-text>
      <div class="text-center">
        <v-icon
          v-if="state === 'unselected'"
          icon="mdi-help-circle-outline"
          size="128"
          color="yellow-darken-2"
        />
        <v-icon
          v-else-if="state === 'updated'"
          icon="mdi-check-circle-outline"
          size="128"
          color="green-darken-2"
        />
        <v-icon
          v-else-if="state === 'forbidden'"
          icon="mdi-alert-circle-outline"
          size="128"
          color="red-darken-2"
        />
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import type { UsersFormState } from '@/interfaces';

defineProps<{
  state: UsersFormState;
}>();

const { translate } = usePageLocale({
  prefix: 'users.sub',
});
</script>
