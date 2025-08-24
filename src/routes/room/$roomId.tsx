import { createFileRoute } from '@tanstack/react-router';

import GameRoomDetailPage from '@/apps/room/[id]';

export const Route = createFileRoute('/room/$roomId')({
  component: GameRoomDetailPage,
});
