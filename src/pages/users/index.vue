<template>
  <v-main class="bg-surface-container">
    <v-container fluid>
      <div class="d-flex flex-row ga-3">
        <div class="d-flex flex-column ga-3 flex-grow-1 flex-shrink-1">
          <v-sheet class="bg-surface" rounded="lg">
            <div class="pa-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
              similique asperiores repudiandae minima incidunt. Corrupti,
              dolores voluptas. Placeat labore exercitationem odit delectus
              commodi, recusandae debitis nostrum nobis et tenetur repellat.
            </div>
          </v-sheet>

          <v-sheet class="bg-surface" rounded="lg">
            <div class="pa-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
              similique asperiores repudiandae minima incidunt. Corrupti,
              dolores voluptas. Placeat labore exercitationem odit delectus
              commodi, recusandae debitis nostrum nobis et tenetur repellat.
            </div>
          </v-sheet>
        </div>

        <app-right-bar-content-wrapper>
          <div
            class="flex-shrink-0 flex-grow-0 pa-4 pa-md-2 pa-lg-0"
            :style="{ width: $vuetify.display.mdAndDown ? '100%' : '400px' }"
          >
            <v-sheet class="bg-surface" rounded="lg">
              <div class="pa-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                similique asperiores repudiandae minima incidunt. Corrupti,
                dolores voluptas. Placeat labore exercitationem odit delectus
                commodi, recusandae debitis nostrum nobis et tenetur repellat.
              </div>
              <div class="pa-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                similique asperiores repudiandae minima incidunt. Corrupti,
                dolores voluptas. Placeat labore exercitationem odit delectus
                commodi, recusandae debitis nostrum nobis et tenetur repellat.
              </div>
              <div class="pa-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                similique asperiores repudiandae minima incidunt. Corrupti,
                dolores voluptas. Placeat labore exercitationem odit delectus
                commodi, recusandae debitis nostrum nobis et tenetur repellat.
              </div>
              <div class="pa-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                similique asperiores repudiandae minima incidunt. Corrupti,
                dolores voluptas. Placeat labore exercitationem odit delectus
                commodi, recusandae debitis nostrum nobis et tenetur repellat.
              </div>
              <div class="pa-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                similique asperiores repudiandae minima incidunt. Corrupti,
                dolores voluptas. Placeat labore exercitationem odit delectus
                commodi, recusandae debitis nostrum nobis et tenetur repellat.
              </div>
            </v-sheet>
          </div>
        </app-right-bar-content-wrapper>
      </div>
    </v-container>
  </v-main>
</template>

<script lang="ts" setup>
definePageMeta({
  name: 'Users',
  subDrawer: {
    breakPoint: 'smAndDown',
    width: 400,
  },
});
</script>
