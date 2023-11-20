<template>
  <v-main class="bg-surface-container">
    <v-container fluid>
      <div class="d-flex flex-row ga-3">
        <div class="d-flex flex-column ga-3 flex-grow-1 flex-shrink-1">
          <users-search-conditions @search="onSearch" />

          <div
            class="d-grid ga-3"
            :style="{
              gridTemplateColumns: `repeat(${
                $vuetify.display.xs
                  ? 1
                  : $vuetify.display.sm
                    ? 2
                    : $vuetify.display.lgAndDown
                      ? 3
                      : 4
              }, 1fr)`,
            }"
          >
            <users-item
              v-for="item in data"
              :key="item.id"
              :item="item"
              @select:item="selectUser"
            />
          </div>
        </div>

        <app-right-bar-content-wrapper>
          <div
            class="flex-shrink-0 flex-grow-0"
            :style="{
              width: $vuetify.display.mdAndUp ? '400px' : '',
              height: $vuetify.display.lgAndDown ? '100%' : '',
            }"
          >
            <users-form-state
              v-if="typeof selectedUserOrState === 'string'"
              :state="selectedUserOrState"
            />
            <users-form-user
              v-else
              :key="selectedUserOrState.id"
              :user="selectedUserOrState"
              @update:user="updateUser"
              @change:state="changeFormState"
            />
          </div>
        </app-right-bar-content-wrapper>
      </div>
    </v-container>
  </v-main>
</template>

<script lang="ts" setup>
import _ from 'lodash';
import { useDisplay } from 'vuetify';

import {
  type ISearchUsersRequest,
  type IUserResponse,
  Permission,
  type UsersFormState,
} from '@/interfaces';
import { services } from '@/services';
import { useAppStore } from '@/store';

definePageMeta({
  name: 'Users',
  subDrawer: {
    breakPoint: 'xs',
    width: 400,
  },
  permissions: [Permission.LIST_USER],
});

const display = useDisplay();

const { hasPermissions } = useAuth();

const { data, request } = useAxios(services.users, 'getAll', {
  immediate: true,
  paramsOrData: [{}],
});

async function onSearch(params: ISearchUsersRequest) {
  await request(params);
}

const appStore = useAppStore();
const { subDrawer } = storeToRefs(appStore);

const selectedUserOrState = ref<IUserResponse | UsersFormState>(
  hasPermissions(Permission.UPDATE_PERMISSIONS_USER)
    ? 'unselected'
    : 'forbidden',
);

function selectUser(user: IUserResponse) {
  selectedUserOrState.value = user;
  subDrawer.value = true;
}

function updateUser(user: IUserResponse) {
  const index = _.findIndex(data.value, (u) => u.id === user.id);

  if (index === -1) {
    return;
  }

  data.value?.splice(index, 1, user);
}

function changeFormState(state: UsersFormState) {
  selectedUserOrState.value = state;

  if (display.lgAndDown.value) {
    subDrawer.value = false;
  }
}
</script>
