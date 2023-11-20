<template>
  <v-navigation-drawer
    v-model="mainDrawer"
    floating
    mobile-breakpoint="lg"
    class="bg-surface-container text-on-surface rounded-e-xl rounded-e-md-0"
  >
    <template #prepend>
      <template v-if="$vuetify.display.mdAndDown">
        <v-list-item height="64" nav>
          <template #prepend>
            <v-btn
              variant="text"
              icon="mdi-menu-open"
              @click="mainDrawer = !mainDrawer"
            ></v-btn>
          </template>

          <v-app-bar-title class="text-primary pa-2">
            {{ $t('common.app.title') }}
          </v-app-bar-title>
        </v-list-item>
        <v-divider />
      </template>
      <v-list class="pt-2 pt-lg-4" nav>
        <v-list-item
          rounded="xl"
          :to="{ name: 'Users:Detail', params: { username: user?.username } }"
        >
          <template #prepend>
            <v-avatar
              color="secondary-container"
              class="elevation-1"
              :image="user?.photoUrl"
            ></v-avatar>
          </template>
          <v-list-item-title>
            {{ user?.displayName }}
          </v-list-item-title>
          <v-list-item-subtitle></v-list-item-subtitle>
        </v-list-item>
      </v-list>
      <v-divider class="ml-0 ml-lg-2" />
    </template>

    <v-list nav>
      <v-list-item
        v-for="{ key, name, icon } in menus"
        :key="key"
        rounded="xl"
        :to="{ name }"
      >
        <template #prepend>
          <v-avatar :icon="icon" color="secondary" />
        </template>

        <v-list-item-title class="px-2">
          {{ translate(`navigations.menus.${key}.title`) }}
        </v-list-item-title>
      </v-list-item>
    </v-list>

    <template #append>
      <v-divider class="ml-0 ml-lg-2" />
      <v-list class="pb-2 pb-lg-4" nav>
        <v-list-item
          v-for="{ key, name, icon } in appendMenus"
          :key="key"
          rounded="xl"
          :to="{ name }"
        >
          <template #prepend>
            <v-avatar :icon="icon" color="secondary" />
          </template>

          <v-list-item-title class="px-2">
            {{ translate(`navigations.menus.${key}.title`) }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store';

const { translate } = useLayoutLocale({ prefix: 'default' });

const appStore = useAppStore();
const { mainDrawer } = storeToRefs(appStore);

type Menu = {
  key: string;
  name: string;
  icon: string;
};

const menus: Array<Menu> = [
  {
    key: 'home',
    name: 'Home',
    icon: 'mdi-home',
  },
  {
    key: 'users',
    name: 'Users',
    icon: 'mdi-account-group',
  },
  {
    key: 'dashboard',
    name: 'Dashboard',
    icon: 'mdi-view-dashboard',
  },
];

const appendMenus: Array<Menu> = [
  {
    key: 'settings',
    name: 'Settings',
    icon: 'mdi-cog',
  },
  {
    key: 'logout',
    name: 'Logout',
    icon: 'mdi-logout',
  },
];

const { user } = useAuth();
</script>
