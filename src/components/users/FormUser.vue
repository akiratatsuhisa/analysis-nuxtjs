<template>
  <v-card
    tag="form"
    class="bg-surface"
    :rounded="$vuetify.display.lgAndDown ? '0' : 'lg'"
    elevation="0"
    :style="{
      height: $vuetify.display.lgAndDown ? '100%' : '',
    }"
    @submit.prevent="onSubmit"
  >
    <template #prepend>
      <v-icon icon="mdi-form-select" color="primary" />
    </template>

    <template #title>
      {{ translate('title') }}
    </template>

    <v-card-text class="d-flex flex-column ga-3">
      <v-text-field
        :label="translateFormField('username')"
        :model-value="user.username"
        readonly
      >
        <template #prepend>
          <v-avatar :image="user.photoUrl" />
        </template>
      </v-text-field>

      <div>
        <label class="mb-2 d-flex align-center ga-1 text-medium-emphasis">
          <v-icon icon="mdi-account-cog-outline" />
          {{ translateFormField('permissions') }}
        </label>

        <div>
          <v-chip-group
            v-model="permissions"
            v-bind="permissionsProps"
            class="v-chip-group--inline"
            column
            filter
            multiple
          >
            <v-chip
              v-for="permission in permissionsList"
              :key="permission"
              :value="permission"
              rounded="lg"
              variant="outlined"
            >
              {{ $t(`common.permissions.${permission}`) }}
            </v-chip>
          </v-chip-group>
        </div>
      </div>
    </v-card-text>

    <v-divider class="mx-3" />

    <div class="pa-3 d-flex ga-2 justify-end">
      <v-btn type="submit" variant="flat" :loading="isLoading">
        {{ translate('form.submit') }}
      </v-btn>
    </div>
  </v-card>
</template>

<script lang="ts" setup>
import _ from 'lodash';

import { type IUserResponse, Permission } from '@/interfaces';
import { services } from '@/services';

const permissionsList = _.values(Permission);

const props = defineProps<{
  user: IUserResponse;
}>();

const emit = defineEmits<{
  'change:state': [state: 'unselected' | 'updated'];
  'update:user': [payload: IUserResponse];
}>();

const { translate, translateFormField } = usePageLocale({
  prefix: 'users.sub',
});

const { defineField, handleSubmit } = useForm<{
  permissions: Array<Permission>;
}>({
  initialValues: {
    permissions: props.user.permissions,
  },
});

const [permissions, permissionsProps] = defineField('permissions');

const { isLoading, request } = useAxios(services.users, 'updatePermissions');

const onSubmit = handleSubmit(async (values) => {
  const data = await request(props.user.username, values);

  emit('update:user', data);

  emit('change:state', 'updated');
});
</script>
