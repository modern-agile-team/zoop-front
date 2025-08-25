import { Crown } from 'lucide-react';

import { Badge } from '@/shared/components/ui/badge';

import type { GameRoomPlayer } from '../types';

interface PlayerCardProps {
  player: GameRoomPlayer;
}

const getTierIcon = (tier: string) => {
  switch (tier) {
    case 'platinum':
      return '💎';
    case 'gold':
      return '🥇';
    case 'silver':
      return '🥈';
    case 'bronze':
      return '🥉';
    default:
      return '🥉';
  }
};

export default function PlayerCard({ player }: PlayerCardProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white rounded-lg border hover:bg-gray-50 transition-colors">
      {/* 방장 아이콘 */}
      {player.isHost && (
        <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 flex-shrink-0" />
      )}

      {/* 플레이어 정보 */}
      <div className="flex flex-col min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900 text-sm sm:text-base truncate">
            {player.name}
          </span>
          {player.isHost && (
            <Badge variant="secondary" className="text-xs">
              방장
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
          <span>{getTierIcon(player.tier)}</span>
          <span className="capitalize">{player.tier}</span>
        </div>
      </div>
    </div>
  );
}
