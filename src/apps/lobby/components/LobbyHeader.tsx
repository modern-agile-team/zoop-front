import { Button } from '@/shared/components/ui/button';
import { Plus, Gamepad2, Users } from 'lucide-react';

interface LobbyHeaderProps {
  onlineCount: number;
  onCreateRoom: () => void;
}

export default function LobbyHeader({
  onlineCount,
  onCreateRoom,
}: LobbyHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center justify-between" role="banner">
          <div className="flex items-center gap-3">
            <Gamepad2 className="size-12 text-blue-600" aria-hidden="true" />
            <h1 className="text-2xl font-bold text-gray-900">Quiz Battle</h1>
          </div>
          <div className="flex items-center gap-4" role="complementary">
            <div
              className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full"
              role="status"
              aria-label={`현재 온라인 사용자: ${onlineCount}명`}
            >
              <Users className="w-4 h-4 text-green-600" aria-hidden="true" />
              <span className="text-sm text-gray-600">온라인</span>
              <span className="inline-flex items-center justify-center min-w-[24px] h-6 px-2 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                {onlineCount}
              </span>
            </div>
            <Button
              onClick={onCreateRoom}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
              aria-label="새 방 만들기"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />방 만들기
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
