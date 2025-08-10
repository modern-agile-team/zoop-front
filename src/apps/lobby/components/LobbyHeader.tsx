import { Button } from '@/shared/components/ui/button';
import { Plus, Gamepad2 } from 'lucide-react';

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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Gamepad2 className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Quiz Battle</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              온라인:{' '}
              <span className="font-semibold text-green-600">
                {onlineCount}
              </span>
            </div>
            <Button
              onClick={onCreateRoom}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />방 만들기
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
