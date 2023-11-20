export const useAppStore = defineStore('app', () => {
  const mainDrawer = useLocalStorage<boolean>('app.layout.mainDrawer', false);
  const subDrawer = useLocalStorage<boolean>('app.layout.subDrawer', false);
  const subDrawerContent = shallowRef<any>(undefined);

  return { mainDrawer, subDrawer, subDrawerContent };
});
