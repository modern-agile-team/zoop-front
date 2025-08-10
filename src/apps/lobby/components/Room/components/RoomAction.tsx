import { Button } from '@/shared/components/ui/button';
import { cn } from '@/lib/utils';
import type { RoomStatus } from '../../../types';
import { getButtonStyles, getButtonText } from '../utils/roomHelpers';

interface RoomActionProps {
  status: RoomStatus;
  isJoinable: boolean;
  roomId: string;
}

export default function RoomAction({ status, isJoinable, roomId }: RoomActionProps) {
  return (
    <footer>
      <Button
        disabled={status === 'full'}
        className={cn(
          'w-full h-10 transition-all duration-300 font-medium',
          getButtonStyles(status, isJoinable)
        )}
        aria-describedby={`room-${roomId}-status`}
      >
        {getButtonText(status)}
      </Button>
    </footer>
  );
}
