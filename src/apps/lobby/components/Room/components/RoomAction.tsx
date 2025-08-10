import { cn } from '@/lib/utils';
import { Button } from '@/shared/components/ui/button';

import { getButtonStyles, getButtonText } from '../utils/roomHelpers';

import type { RoomStatus } from '../../../types';

interface RoomActionProps {
  status: RoomStatus;
  isJoinable: boolean;
  roomId: string;
}

export default function RoomAction({
  status,
  isJoinable,
  roomId,
}: RoomActionProps) {
  return (
    <footer>
      <Button
        disabled={status === 'full'}
        size="sm"
        className={cn(
          'w-full h-8 sm:h-10 transition-all duration-300 font-medium text-xs sm:text-sm',
          getButtonStyles(status, isJoinable)
        )}
        aria-describedby={`room-${roomId}-status`}
      >
        {getButtonText(status)}
      </Button>
    </footer>
  );
}
