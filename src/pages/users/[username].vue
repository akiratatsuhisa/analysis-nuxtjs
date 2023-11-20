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
        <div>Profile</div>

        <div>
          {{ data?.displayName }}
        </div>
      </v-responsive>
    </v-container>
  </v-main>
</template>

<script lang="ts" setup>
import { Permission } from '@/interfaces';
import { services } from '@/services';

definePageMeta({
  name: 'Users:Detail',
  permissions: [Permission.READ_USER],
});

const route = useRoute();

const { data } = useAxios(services.users, 'getByUsername', {
  immediate: true,
  paramsOrData: [route.params.username as string],
});
</script>
