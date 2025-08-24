import type { GameRoomDtoStatus } from '@/lib/orval/_generated/quizzesGameIoBackend.schemas';
import { cn } from '@/lib/utils';
import { Button } from '@/shared/components/ui/button';

import { getButtonStyles, getButtonText } from '../utils/roomHelpers';

interface RoomActionProps {
  status: GameRoomDtoStatus;
  roomId: string;
  currentMembersCount: number;
  maxMembersCount: number;
}

export default function RoomAction({
  status,
  currentMembersCount,
  maxMembersCount,
  roomId,
}: RoomActionProps) {
  const isJoinable =
    status === 'waiting' && currentMembersCount < maxMembersCount;

  return (
    <footer>
      <Button
        disabled={!isJoinable}
        size="sm"
        className={cn(
          'w-full h-8 sm:h-10 transition-all duration-300 font-medium text-xs sm:text-sm',
          getButtonStyles({ status, currentMembersCount, maxMembersCount })
        )}
        aria-describedby={`room-${roomId}-status`}
      >
        {getButtonText({ status, currentMembersCount, maxMembersCount })}
      </Button>
    </footer>
  );
}
