import { createFileRoute } from '@tanstack/react-router';

import LobbyPage from '@/apps/lobby';
import { queryClient } from '@/lib/queryClient';
import { gameRoomQuery } from '@/shared/service/api/query/room';

export const Route = createFileRoute('/lobby/')({
  component: LobbyPage,
  loader: async () => {
    await queryClient.ensureQueryData(gameRoomQuery.getList());
  },
});
