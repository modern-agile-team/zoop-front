import { Users, Clock, Trophy } from 'lucide-react';

interface GameInfoCardProps {
  maxPlayers: number;
  currentPlayers: number;
  roomId: string;
}

export default function GameInfoCard({
  maxPlayers,
  currentPlayers,
  roomId,
}: GameInfoCardProps) {
  return (
    <div className="p-4 bg-white rounded-lg border">
      <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
        <Trophy className="w-4 h-4" />
        게임 정보
      </h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-4 h-4" />
            <span>참여자</span>
          </div>
          <span className="font-medium">
            {currentPlayers}/{maxPlayers}명
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span>제한시간</span>
          </div>
          <span className="font-medium">30초</span>
        </div>

        <div className="pt-2 border-t border-gray-100">
          <div className="flex justify-between text-xs text-gray-500">
            <span>방 ID</span>
            <span className="font-mono">{roomId}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
