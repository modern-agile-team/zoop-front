import { QueryClientProvider } from '@tanstack/react-query';
import { Outlet, createRootRoute, useLocation } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { OverlayProvider } from 'overlay-kit';

import { queryClient } from '@/lib/queryClient';
import { ToastContainer } from '@/shared/components/ToastContainer';

const Component = () => {
  const location = useLocation();

  return (
    <QueryClientProvider client={queryClient}>
      <OverlayProvider key={location.pathname}>
        <Outlet />
        <ToastContainer />
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
