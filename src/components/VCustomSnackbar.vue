<template>
  <v-snackbar v-model="snackbar" v-bind="props">
    <template v-if="contentIsString">
      {{ content }}
    </template>

    <template v-else>
      <component :is="content" />
    </template>

    <template v-if="contentIsString" #actions>
      <v-btn
        variant="text"
        :color="
          props.color === 'inverse-surface'
            ? 'primary-container'
            : `on-${props.color}`
        "
        @click="onClose"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import type { SnackbarProps } from '@/composables/useSnackbar';

const props = defineProps<SnackbarProps>();

const emit = defineEmits<{
  (event: 'close', payload?: any): void;
}>();

const contentIsString = computed(() => typeof props.content === 'string');

const snackbar = ref(true);

function onClose() {
  snackbar.value = false;
}

watch(snackbar, (snackbar) => {
  if (snackbar) {
    return;
  }

  setTimeout(() => {
    emit('close');
  }, 250);
});
</script>
