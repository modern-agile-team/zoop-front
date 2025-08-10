import { Plus, Gamepad2, Users } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';

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
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
        <nav className="flex items-center justify-between" role="banner">
          <div className="flex items-center gap-2 sm:gap-3">
            <Gamepad2 className="size-6 sm:size-8 text-blue-600" aria-hidden="true" />
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Quiz Battle</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-4" role="complementary">
            <div
              className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-green-50 border border-green-200 rounded-full"
              role="status"
              aria-label={`현재 온라인 사용자: ${onlineCount}명`}
            >
              <Users className="size-3 sm:size-4 text-green-600" aria-hidden="true" />
              <span className="text-xs sm:text-sm text-gray-600 hidden sm:inline">온라인</span>
              <span className="inline-flex items-center justify-center min-w-[20px] sm:min-w-[24px] h-5 sm:h-6 px-1.5 sm:px-2 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                {onlineCount}
              </span>
            </div>
            <Button
              onClick={onCreateRoom}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base px-3 sm:px-4 py-1.5 sm:py-2"
              aria-label="새 방 만들기"
            >
              <Plus className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
              <span className="hidden sm:inline">방 만들기</span>
              <span className="sm:hidden">방 생성</span>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
