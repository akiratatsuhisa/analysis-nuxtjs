<template>
  <template v-if="subDrawer && $vuetify.display.lgAndUp">
    <slot />
  </template>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store';

const appStore = useAppStore();
const { subDrawer, subDrawerContent } = storeToRefs(appStore);

const slots = defineSlots<{
  default(): any;
}>();

onBeforeMount(() => {
  subDrawerContent.value = slots.default;
});

onBeforeUnmount(() => {
  subDrawerContent.value = undefined;
});
</script>
