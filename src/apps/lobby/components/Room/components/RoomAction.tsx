import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

import type { GameRoomDto } from '@/lib/orval/_generated/quizzesGameIoBackend.schemas';
import { cn } from '@/lib/utils';
import { Button } from '@/shared/components/ui/button';
import { parseApiError } from '@/shared/service/api/client/ApiError';
import { ERROR_MESSAGE_MAP } from '@/shared/service/api/constant/errorMessage';
import { gameRoomQuery } from '@/shared/service/api/query/room';
import { toast } from '@/shared/utils/toast';

import { getButtonStyles, getButtonText } from '../utils/roomHelpers';

import { calculateRoomState } from '../../../utils/gameRoomPolicy';

interface RoomActionProps {
  room: GameRoomDto;
}

export default function RoomAction({ room }: RoomActionProps) {
  const state = calculateRoomState(room);

  const { mutateAsync: joinRoom } = useMutation(gameRoomQuery.joinRoom);
  const navigate = useNavigate();

  const handleJoinRoom = async () => {
    try {
      await joinRoom(room.id);
      await navigate({
        to: '/room/$roomId',
        params: { roomId: room.id },
      });
      toast.success('방에 입장했습니다!');
    } catch (error) {
      const { code } = parseApiError(error);
      toast.error(ERROR_MESSAGE_MAP[code]);
    }
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
