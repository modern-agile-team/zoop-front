import LobbyPage from '@/apps/lobby';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/lobby/')({
  component: LobbyPage,
});
