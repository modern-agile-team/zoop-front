import { useSuspenseQuery } from '@tanstack/react-query';

import { useResponsive } from '@/shared/hooks/useResponsive';
import { gameRoomQuery } from '@/shared/service/api/query/room';

import DesktopLayout from './components/layouts/DesktopLayout';
import MobileLayout from './components/layouts/MobileLayout';
import ResponsiveHeader from './components/ResponsiveHeader';
import { PARTICIPANTS } from './data/mockData';
import { roomFilters } from './utils/gameRoomPolicy';

export default function LobbyPage() {
  const { isDesktop } = useResponsive();

  const { data } = useSuspenseQuery({
    ...gameRoomQuery.getList(),
    staleTime: 1_000 * 60 * 5,
  });

  const allRooms = data?.data || [];
  const waitingRooms = roomFilters.waiting(allRooms);
  const playingRooms = roomFilters.inProgress(allRooms);

  const layoutProps = {
    waitingRooms,
    playingRooms,
    participants: PARTICIPANTS,
  };

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
