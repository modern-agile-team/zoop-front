import { toast } from 'react-toastify';

import type { GameRoomDto } from '@/lib/orval/_generated/quizzesGameIoBackend.schemas';

import GameInfoCard from '../components/GameInfoCard';
import PlayersList from '../components/PlayersList';
import ReadyControls from '../components/ReadyControls';

interface MobileLayoutProps {
  isHost: boolean;
  room: GameRoomDto;
  roomId: string;
}

export default function MobileLayout({
  isHost,
  room,
  roomId,
}: MobileLayoutProps) {
  const canStartGame = room.members.length === room.maxMembersCount;

  const handleStartGame = () => {
    if (!isHost || !canStartGame) return;

    toast.info('개발중인 기능입니다.');
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* 플레이어 목록 */}
      <div>
        <PlayersList players={room.members} />
      </div>

      {/* 준비 상태 컨트롤과 게임 정보 */}
      <div className="space-y-4">
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
