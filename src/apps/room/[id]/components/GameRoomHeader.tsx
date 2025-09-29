import type { GameRoomDto } from '@/lib/orval/_generated/quizzesGameIoBackend.schemas';
import { Badge } from '@/shared/components/ui/badge';

interface GameRoomHeaderProps {
  room: GameRoomDto;
}

export default function GameRoomHeader({ room }: GameRoomHeaderProps) {
  const totalPlayersCount = room.members.length;
  const canStart = totalPlayersCount === room.maxMembersCount;

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {room.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>
              참여자: {totalPlayersCount}/{room.maxMembersCount}
            </span>
            <span className={canStart ? 'text-green-600 font-medium' : ''}>
              {canStart ? '게임 시작 가능!' : '플레이어를 기다리는 중...'}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge variant={canStart ? 'success' : 'secondary'}>
            {room.status === 'waiting'
              ? canStart
                ? '시작 가능'
                : '대기 중'
              : room.status === 'inProgress'
                ? '게임 중'
                : '게임 종료'}
          </Badge>
        </div>
      </div>
    </div>
  );
}
