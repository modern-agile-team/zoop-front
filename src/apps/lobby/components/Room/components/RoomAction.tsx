import { useNavigate } from '@tanstack/react-router';

import type { GameRoomDto } from '@/lib/orval/_generated/quizzesGameIoBackend.schemas';
import { cn } from '@/lib/utils';
import { Button } from '@/shared/components/ui/button';

import { getButtonStyles, getButtonText } from '../utils/roomHelpers';

import { calculateRoomState } from '../../../utils/gameRoomPolicy';

interface RoomActionProps {
  room: GameRoomDto;
}

export default function RoomAction({ room }: RoomActionProps) {
  const state = calculateRoomState(room);

  const navigate = useNavigate();

  const handleJoinRoom = () => {
    navigate({
      to: '/room/$roomId',
      params: { roomId: room.id },
    });
  };

  return (
    <footer>
      <Button
        disabled={!state.isJoinable}
        size="sm"
        className={cn(
          'w-full h-8 sm:h-10 transition-all duration-300 font-medium text-xs sm:text-sm',
          getButtonStyles(room)
        )}
        onClick={handleJoinRoom}
        aria-describedby={`room-${room.id}-status`}
      >
        {getButtonText(room)}
      </Button>
    </footer>
  );
}
