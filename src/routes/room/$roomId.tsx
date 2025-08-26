import { createFileRoute, redirect } from '@tanstack/react-router';

import GameRoomDetailPage from '@/apps/room/[id]';
import { parseApiError } from '@/shared/service/api/client/ApiError';
import { gameRoomQuery } from '@/shared/service/api/query/room';

export const Route = createFileRoute('/room/$roomId')({
  component: GameRoomDetailPage,
  beforeLoad: async (ctx) => {
    try {
      const { params } = ctx;
      const roomId = params.roomId;
      const joinRoomMutation = gameRoomQuery.joinRoom;

      if (!joinRoomMutation.mutationFn) {
        throw new Error('Join room mutation function is not available');
      }

      await joinRoomMutation.mutationFn(roomId);
    } catch (error) {
      const { code } = parseApiError(error);
      switch (code) {
        case 'GAME_ROOM_MEMBER.CAPACITY_EXCEEDED':
        case 'GAME_ROOM.NOT_FOUND': {
          throw redirect({ to: '/lobby' });
        }
        case 'COMMON.REQUEST_VALIDATION_ERROR': {
          // TODO: 토스트 표시
          break;
        }
      }
    }
  },
});
