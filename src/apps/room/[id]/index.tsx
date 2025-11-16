import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';

import { Button } from '@/shared/components/ui/button';
import { useResponsiveClasses } from '@/shared/hooks/useResponsive';
import { accountsQuery, gameRoomQuery } from '@/shared/service/api/query';

import GameInfoCard from './components/GameInfoCard';
import GameRoomHeader from './components/GameRoomHeader';
import PlayersList from './components/PlayersList';
import ReadyControls from './components/ReadyControls';

export default function GameRoomDetailPage() {
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

  const { mutate: exitRoom } = useMutation(gameRoomQuery.exitRoom);

  const currentPlayer = room.members.find(
    (player) => player.accountId === currentUser.id
  );
  const isHost = currentPlayer?.role === 'host' || false;

  const handleBackToLobby = () => {
    if (confirm('정말로 나가시겠습니까?')) {
      exitRoom(roomId);
      navigate({ to: '/lobby', replace: false });
    }
  };

  const canStartGame = room.members.length === room.maxMembersCount;

  const handleStartGame = () => {
    if (!isHost || !canStartGame) return;

    toast.info('개발중인 기능입니다.');
  };

  const roomLayoutStyles = useResponsiveClasses({
    mobile: 'flex flex-col ',
    tablet: 'flex flex-col ',
    desktop: 'grid grid-cols-3 ',
  });

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

          {/* 모바일에서는 세로 배치, 데스크톱에서는 가로 배치 */}
          <div className={`${roomLayoutStyles} gap-6`}>
            {/* 왼쪽 영역 - 플레이어 목록 */}
            <div className="col-span-2">
              <PlayersList players={room.members} />
            </div>

            {/* 오른쪽 영역 - 준비 상태 컨트롤과 게임 정보 */}
            <div className="col-span-1 space-y-4">
              <ReadyControls
                isHost={isHost}
                canStartGame={canStartGame}
                onStartGame={handleStartGame}
                currentPlayers={room.members.length}
                maxPlayers={room.maxMembersCount}
              />

              {/* 게임 정보 카드 */}
              <GameInfoCard
                maxPlayers={room.maxMembersCount}
                currentPlayers={room.members.length}
                roomId={roomId}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
