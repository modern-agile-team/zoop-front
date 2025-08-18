import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, createRootRoute, useLocation } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { OverlayProvider } from 'overlay-kit';

const queryClient = new QueryClient();

const Component = () => {
  const location = useLocation();

  return (
    <QueryClientProvider client={queryClient}>
      <OverlayProvider key={location.pathname}>
        <Outlet />
        <TanStackRouterDevtools />
      </OverlayProvider>
    </QueryClientProvider>
  );
};

export const Route = createRootRoute({
  component: () => {
    return <Component />;
  },
});
