import { toast } from 'react-toastify';

import type { GameRoomDto } from '@/lib/orval/_generated/quizzesGameIoBackend.schemas';

import GameInfoCard from '../components/GameInfoCard';
import PlayersList from '../components/PlayersList';
import ReadyControls from '../components/ReadyControls';

interface DesktopLayoutProps {
  isHost: boolean;
  room: GameRoomDto;
  roomId: string;
}

export default function DesktopLayout({
  isHost,
  room,
  roomId,
}: DesktopLayoutProps) {
  const canStartGame = room.members.length === room.maxMembersCount;

  const handleStartGame = () => {
    if (!isHost || !canStartGame) return;

    toast.info('개발중인 기능입니다.');
  };

  return (
    <div className="grid grid-cols-3 gap-6">
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
  );
}
