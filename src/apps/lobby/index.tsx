import { useQuery } from '@tanstack/react-query';

import { useResponsive } from '@/shared/hooks/useResponsive';
import { gameRoomQuery } from '@/shared/service/api/query/room';

import DesktopLayout from './components/layouts/DesktopLayout';
import MobileLayout from './components/layouts/MobileLayout';
import ResponsiveHeader from './components/ResponsiveHeader';
import { PARTICIPANTS, ANNOUNCEMENTS } from './data/mockData';

export default function LobbyPage() {
  const { isDesktop } = useResponsive();

  const { data } = useQuery(gameRoomQuery.getList());

  const layoutProps = {
    waitingRooms: data?.data.filter((v) => v.status === 'waiting') || [],
    playingRooms: data?.data.filter((v) => v.status === 'inProgress') || [],
    participants: PARTICIPANTS,
    announcements: ANNOUNCEMENTS,
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
