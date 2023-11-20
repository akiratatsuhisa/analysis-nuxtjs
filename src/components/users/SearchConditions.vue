<template>
  <v-card
    tag="form"
    class="bg-surface"
    rounded="lg"
    elevation="0"
    @submit.prevent="onSubmit"
  >
    <template #prepend>
      <v-icon color="primary" icon="mdi-magnify" />
    </template>

    <template #title>
      {{ translate('title') }}
    </template>

    <v-card-text>
      <v-row no-gutters class="mx-n2">
        <v-col cols="12" md="6" class="py-2 px-md-2">
          <v-text-field
            :label="translateFormField('search')"
            prepend-inner-icon="mdi-account-search-outline"
            v-model="search"
            v-bind="searchProps"
          />
        </v-col>

        <v-col cols="12" md="6" class="py-2 px-md-2">
          <v-text-field
            :label="translateFormField('email')"
            prepend-inner-icon="mdi-email-search-outline"
            v-model="email"
            v-bind="emailProps"
          />
        </v-col>

        <v-col cols="12" md="4" class="py-2 px-md-2">
          <v-text-field
            :label="translateFormField('username')"
            prepend-inner-icon="mdi-card-account-details-outline"
            v-model="username"
            v-bind="usernameProps"
          />
        </v-col>

        <v-col cols="12" md="8" class="py-2 px-md-2">
          <div
            class="d-grid ga-4"
            :style="{
              gridTemplateColumns: `repeat(${$vuetify.display.xs ? 1 : 2}, 1fr)`,
            }"
          >
            <v-menu :close-on-content-click="false">
              <template #activator="{ props }">
                <v-text-field
                  :label="translateFormField('createdAtFrom')"
                  prepend-inner-icon="mdi-calendar-start-outline"
                  append-inner-icon="mdi-calendar-outline"
                  readonly
                  clearable
                  :model-value="createdAtFromDisplay"
                  @update:model-value="createdAtFrom = $event"
                  v-bind="mergeProps(createdAtFromProps, props)"
                />
              </template>

              <v-date-picker v-model="createdAtFrom" />
            </v-menu>

            <v-menu :close-on-content-click="false">
              <template #activator="{ props }">
                <v-text-field
                  :label="translateFormField('createdAtTo')"
                  prepend-inner-icon="mdi-calendar-end-outline"
                  append-inner-icon="mdi-calendar-outline"
                  readonly
                  clearable
                  :model-value="createdAtToDisplay"
                  @update:model-value="createdAtTo = $event"
                  v-bind="mergeProps(createdAtToProps, props)"
                />
              </template>

              <v-date-picker v-model="createdAtTo" />
            </v-menu>
          </div>
        </v-col>

        <v-col cols="12" class="py-2 px-md-2">
          <label class="text-medium-emphasis">
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

            <v-chip-group
              v-model="permissionMode"
              v-bind="permissionModeProps"
              class="v-chip-group--inline"
            >
              <v-chip
                :value="true"
                rounded="lg"
                variant="outlined"
                :append-icon="
                  permissionMode
                    ? 'mdi-checkbox-multiple-marked-outline'
                    : 'mdi-checkbox-marked-outline'
                "
                prepend-icon="mdi-account-cog-outline"
              >
                {{
                  permissionMode
                    ? $t('common.matches.all')
                    : $t('common.matches.any')
                }}
              </v-chip>
            </v-chip-group>
          </div>
        </v-col>
      </v-row>
    </v-card-text>

    <v-divider class="mx-3" />

    <div class="pa-3 d-flex ga-2">
      <v-btn type="submit" variant="flat">
        {{ translate('form.submit') }}
      </v-btn>

      <v-btn variant="tonal" @click="resetForm">
        {{ translate('form.clear') }}
      </v-btn>
    </div>
  </v-card>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import _ from 'lodash';
import { mergeProps } from 'vue';

import { Format } from '@/helpers';
import { type ISearchUsersRequest, Permission } from '@/interfaces';

const permissionsList = _.values(Permission);

const emit = defineEmits<{
  search: [params: ISearchUsersRequest];
}>();

const i18n = useI18n();

const { translate, translateFormField } = usePageLocale({
  prefix: 'users.main',
});

const { defineField, resetForm, handleSubmit } = useForm<
  Omit<ISearchUsersRequest, 'createdAtFrom' | 'createdAtTo'> & {
    createdAtFrom?: dayjs.Dayjs | string | null;
    createdAtTo?: dayjs.Dayjs | string | null;
  }
>({
  initialValues: {
    search: '',
    email: '',
    username: '',
    createdAtFrom: null,
    createdAtTo: null,
    permissions: [],
    permissionMode: false,
  },
});

const [search, searchProps] = defineField('search');

const [email, emailProps] = defineField('email');

const [username, usernameProps] = defineField('username');

const [createdAtFrom, createdAtFromProps] = defineField('createdAtFrom');
const createdAtFromDisplay = computed(() =>
  Format.date(createdAtFrom.value, { locales: i18n.locale.value }),
);

const [createdAtTo, createdAtToProps] = defineField('createdAtTo');
const createdAtToDisplay = computed(() =>
  Format.date(createdAtTo.value, { locales: i18n.locale.value }),
);

const [permissions, permissionsProps] = defineField('permissions');
const [permissionMode, permissionModeProps] = defineField('permissionMode');

const onSubmit = handleSubmit((values) => {
  emit('search', {
    ..._.omit(values, ['createdAtFrom', 'createdAtTo']),
    createdAtFrom: values.createdAtFrom
      ? dayjs(values.createdAtFrom).format('YYYY-MM-DD')
      : undefined,
    createdAtTo: values.createdAtTo
      ? dayjs(values.createdAtTo).format('YYYY-MM-DD')
      : undefined,
  });
});
</script>
