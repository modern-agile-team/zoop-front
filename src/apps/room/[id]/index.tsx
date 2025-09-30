import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { useResponsive } from '@/shared/hooks/useResponsive';
import { accountsQuery, gameRoomQuery } from '@/shared/service/api/query';

import GameRoomHeader from './components/GameRoomHeader';
import DesktopLayout from './layouts/DesktopLayout';
import MobileLayout from './layouts/MobileLayout';

export default function GameRoomDetailPage() {
  const { isDesktop } = useResponsive();
  const { roomId } = useParams({ from: '/room/$roomId' });
  const navigate = useNavigate();

  const { data: room } = useSuspenseQuery({
    ...gameRoomQuery.getDetail(roomId),
    staleTime: 1000 * 60 * 5,
  });

  const { data: currentUser } = useSuspenseQuery({
    ...accountsQuery.getMyInfo(),
    staleTime: 1000 * 60 * 5,
  });

  const currentPlayer = room.members.find(
    (player) => player.accountId === currentUser.id
  );
  const isHost = currentPlayer?.role === 'host' || false;

  const handleBackToLobby = () => {
    navigate({ to: '/lobby', replace: false });
  };

  const layoutProps = {
    isHost,
    room,
    roomId,
  };

  if (!currentPlayer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            방을 찾을 수 없습니다
          </h1>
          <p className="text-gray-600 mb-4">
            존재하지 않는 방이거나 접근 권한이 없습니다.
          </p>
          <Button onClick={handleBackToLobby}>로비로 돌아가기</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* 헤더 - 뒤로가기 버튼 */}
        <div className="mb-6">
          <Button variant="ghost" onClick={handleBackToLobby} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            로비로 돌아가기
          </Button>
        </div>

        <div className="space-y-6">
          {/* 방 정보 헤더 */}
          <GameRoomHeader room={room} />

          {isDesktop ? (
            <DesktopLayout {...layoutProps} />
          ) : (
            <MobileLayout {...layoutProps} />
          )}
        </div>
      </div>
    </div>
  );
}
