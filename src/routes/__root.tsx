import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, createRootRoute, useLocation } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { OverlayProvider } from 'overlay-kit';
import { useEffect } from 'react';

import { socketClient } from '@/shared/service/socket/client';

const queryClient = new QueryClient();

const Component = () => {
  const location = useLocation();
  useEffect(() => {
    const socket = socketClient.getSocket();

    socketClient.connect();
    return () => {
      if (socket?.connected) {
        socket.close();
      }
    };
  }, []);

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
