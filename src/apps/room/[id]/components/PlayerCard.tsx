import { Crown } from 'lucide-react';

import type { GameRoomMemberDto } from '@/lib/orval/_generated/quizzesGameIoBackend.schemas';
import { Badge } from '@/shared/components/ui/badge';

interface PlayerCardProps {
  player: GameRoomMemberDto;
}

export default function PlayerCard({ player }: PlayerCardProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white rounded-lg border hover:bg-gray-50 transition-colors">
      {/* 방장 아이콘 */}
      {player.role === 'host' && (
        <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 flex-shrink-0" />
      )}

      {/* 플레이어 정보 */}
      <div className="flex flex-col min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900 text-sm sm:text-base truncate">
            {player.nickname}
          </span>
          {player.role === 'host' && (
            <Badge variant="secondary" className="text-xs">
              방장
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
