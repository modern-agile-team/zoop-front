import type { GameRoomPlayer } from '../types';
import PlayerCard from './PlayerCard';

interface PlayersListProps {
  players: GameRoomPlayer[];
}

export default function PlayersList({ players }: PlayersListProps) {
  // 정렬: 방장을 맨 앞으로
  const sortedPlayers = [...players].sort((a, b) => {
    if (a.isHost && !b.isHost) return -1;
    if (!a.isHost && b.isHost) return 1;
    return 0;
  });

  return (
    <div className="bg-white rounded-lg border p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        참여자 ({players.length}명)
      </h2>
      <div className="space-y-3">
        {sortedPlayers.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
}
