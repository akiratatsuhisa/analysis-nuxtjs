const { isAuthenticated, hasPermissions } = useAuth();

export default defineNuxtRouteMiddleware((to) => {
  const { unauth, permissions: requiredPermissions } = to.meta;

  if (unauth) {
    return;
  }

  if (!isAuthenticated.value) {
    return navigateTo({ name: 'Login' });
  }

  if (requiredPermissions && !hasPermissions(...requiredPermissions)) {
    return navigateTo({ name: 'Forbidden', replace: true });
  }
});
