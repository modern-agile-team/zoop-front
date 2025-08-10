import { createFileRoute } from '@tanstack/react-router';

import LobbyPage from '@/apps/lobby';

export const Route = createFileRoute('/lobby/')({
  component: LobbyPage,
});
