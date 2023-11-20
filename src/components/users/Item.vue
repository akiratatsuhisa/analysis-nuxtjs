<template>
  <div>
    <v-card class="bg-surface" rounded="lg" elevation="0">
      <template #prepend>
        <v-avatar :image="item.photoUrl" />
      </template>

      <template #title>{{ item.displayName }}</template>

      <template #subtitle>{{ item.username }}</template>

      <v-card-actions>
        <v-btn
          size="small"
          :icon="isExpand ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="isExpand = !isExpand"
        />

        <v-spacer />

        <v-btn
          v-if="hasPermissions(Permission.UPDATE_PERMISSIONS_USER)"
          color="primary"
          @click="emit('select:item', item)"
        >
          {{ translate('title') }}
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="isExpand">
          <v-divider />
          <v-list>
            <v-list-item>
              <template #append>
                <v-icon icon="mdi-account-outline" />
              </template>

              <v-list-item-title>
                {{ translate('firstName') }}
              </v-list-item-title>

              <v-tooltip :text="item.firstName">
                <template #activator="{ props }">
                  <v-list-item-subtitle v-bind="props">
                    {{ item.firstName }}
                  </v-list-item-subtitle>
                </template>
              </v-tooltip>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>
                {{ translate('lastName') }}
              </v-list-item-title>

              <v-tooltip :text="item.lastName">
                <template #activator="{ props }">
                  <v-list-item-subtitle v-bind="props">
                    {{ item.lastName }}
                  </v-list-item-subtitle>
                </template>
              </v-tooltip>
            </v-list-item>

            <v-list-item>
              <template #append>
                <v-icon icon="mdi-email-outline" />
              </template>

              <v-list-item-title>
                {{ translate('email') }}
              </v-list-item-title>

              <v-tooltip :text="item.email">
                <template #activator="{ props }">
                  <v-list-item-subtitle v-bind="props">
                    {{ item.email }}
                  </v-list-item-subtitle>
                </template>
              </v-tooltip>
            </v-list-item>

            <v-list-item>
              <template #title>
                {{ translate('permissions') }}
              </template>

              <v-chip
                v-for="permission in item.permissions"
                :key="permission"
                :value="permission"
                rounded="lg"
                variant="outlined"
                class="my-1 mr-2"
              >
                {{ $t(`common.permissions.${permission}`) }}
              </v-chip>
            </v-list-item>
          </v-list>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { type IUserResponse, Permission } from '@/interfaces';

defineProps<{ item: IUserResponse }>();

const emit = defineEmits<{ 'select:item': [item: IUserResponse] }>();

const { hasPermissions } = useAuth();

const { translate } = usePageLocale({
  prefix: 'users.main.explore',
});

const isExpand = ref(false);
</script>
