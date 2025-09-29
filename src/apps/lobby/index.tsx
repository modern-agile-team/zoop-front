import { useSuspenseQuery } from '@tanstack/react-query';

import { ServerToClientEventNames } from '@/lib/asyncApi/_generated/types';
import { queryClient } from '@/lib/queryClient';
import { useResponsive } from '@/shared/hooks/useResponsive';
import { lobbyQuery } from '@/shared/service/api/query/lobby';
import { gameRoomQuery } from '@/shared/service/api/query/room';
import { useSocketListener } from '@/shared/service/socket/hooks/useSocketListener';

import DesktopLayout from './components/layouts/DesktopLayout';
import MobileLayout from './components/layouts/MobileLayout';
import ResponsiveHeader from './components/ResponsiveHeader';
import { roomFilters } from './utils/gameRoomPolicy';
import { roomFromEvent } from './utils/helpers';

export default function LobbyPage() {
  const { isDesktop } = useResponsive();

  const { data } = useSuspenseQuery({
    ...gameRoomQuery.getList(),
    staleTime: 1_000 * 60 * 5,
  });

  const { data: participantData } = useSuspenseQuery({
    ...lobbyQuery.getList({ isActive: 'true' }),
    staleTime: 1_000 * 60 * 5,
  });

  const allRooms = data?.data || [];
  const waitingRooms = roomFilters.waiting(allRooms);
  const playingRooms = roomFilters.inProgress(allRooms);

  const participants = participantData?.data || [];

  const layoutProps = {
    waitingRooms,
    playingRooms,
    participants,
  };

  useSocketListener(
    ServerToClientEventNames.LOBBY_GAME_ROOM_CREATED,
    (data) => {
      queryClient.setQueryData(gameRoomQuery.getList().queryKey, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: [...oldData.data, roomFromEvent(data)],
        };
      });
    }
  );

  useSocketListener(
    ServerToClientEventNames.LOBBY_GAME_ROOM_DELETED,
    ({ body }) => {
      queryClient.setQueryData(gameRoomQuery.getList().queryKey, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: oldData.data.filter((room) => room.id !== body.gameRoomId),
        };
      });
    }
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <ResponsiveHeader />

        <main
          className="max-w-7xl mx-auto p-3 sm:p-4 lg:p-6 min-h-[calc(100vh-80px)] sm:min-h-[calc(100vh-100px)] lg:min-h-[calc(100vh-120px)]"
          role="main"
        >
          {isDesktop ? (
            <DesktopLayout {...layoutProps} />
          ) : (
            <MobileLayout {...layoutProps} />
          )}
        </main>
      </div>
    </>
  );
}
