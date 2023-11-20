<template>
  <v-card class="bg-surface-container-lowest" elevation="0">
    <v-card-title>Test</v-card-title>

    <v-card-text>
      <apexchart type="bar" :options="options" :series="series" />
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
const options = {
  chart: {
    id: 'vuechart-example',
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
  },
};

const series = [
  {
    name: 'series-1',
    data: [30, 40, 45, 50, 49, 60, 70, 91],
  },
];
</script>
