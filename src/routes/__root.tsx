import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, createRootRoute, useLocation } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { OverlayProvider } from 'overlay-kit';
import { useEffect } from 'react';

import useAuth from '@/shared/hooks/useAuth';
import { socketClient } from '@/shared/service/socket/client';

const queryClient = new QueryClient();

const SocketProvider = () => {
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    const socket = socketClient.connect();
    return () => {
      if (socket.connected) {
        socket.close();
      }
    };
  }, [isLoggedIn]);

  return null;
};

const Component = () => {
  const location = useLocation();

  return (
    <QueryClientProvider client={queryClient}>
      <SocketProvider />
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
