<template>
  <v-container class="fill-height">
    <v-row>
      <v-col class="mx-auto" md="6" lg="4">
        <v-card class="bg-surface" variant="flat" rounded="xl">
          <v-card-title>
            {{ translate('title') }}
          </v-card-title>

          <v-card-subtitle class="text-wrap">
            {{ translate('subtitle') }}
          </v-card-subtitle>

          <v-card-text class="text-center">
            <v-progress-circular
              indeterminate
              color="primary"
              size="80"
              width="8"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'auth',
  name: 'Logout',
  unauth: true,
});

const { translate } = usePageLocale({
  prefix: 'logout',
});
const { logout } = useAuth();

onMounted(async () => {
  await logout();

  setTimeout(() => {
    navigateTo({
      name: 'Login',
      query: { redirectUrl: history.state.back ?? '/' },
    });
  }, 500);
});
</script>
