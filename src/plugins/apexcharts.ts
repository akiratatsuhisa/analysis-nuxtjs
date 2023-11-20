import VueApexCharts from 'vue3-apexcharts';

export default defineNuxtPlugin((app) => {
  app.vueApp.use(VueApexCharts);
});
