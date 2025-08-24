import type { GameRoomDto } from '@/lib/orval/_generated/quizzesGameIoBackend.schemas';
import { cn } from '@/lib/utils';
import { useResponsiveClasses } from '@/shared/hooks/useResponsive';

import RoomAction from './components/RoomAction';
import RoomHeader from './components/RoomHeader';
import RoomInfoSection from './components/RoomInfo';
import { getStatusConfig, getCardStyles } from './utils/roomHelpers';

export default function Room(roomInfo: GameRoomDto) {
  const { title, id, currentMembersCount, maxMembersCount, status } = roomInfo;

  const statusConfig = getStatusConfig({
    maxMembersCount,
    currentMembersCount,
    status,
  });

  const cardPaddingStyles = useResponsiveClasses({
    mobile: 'p-3',
    tablet: 'p-3 sm:p-4',
    desktop: 'p-4',
  });

  return (
    <article
      className={cn(
        'group relative overflow-hidden rounded-lg border transition-all duration-300 transform',
        getCardStyles({ maxMembersCount, currentMembersCount, status })
      )}
      role="button"
      tabIndex={0}
      aria-label={`방 ${id}: ${title} - ${statusConfig.text}`}
    >
      <div className={`flex flex-col gap-2 ${cardPaddingStyles}`}>
        <RoomHeader title={title} statusConfig={statusConfig} />

        <RoomInfoSection
          maxMembersCount={maxMembersCount}
          currentMembersCount={currentMembersCount}
        />

        <RoomAction
          status={status}
          roomId={id}
          currentMembersCount={currentMembersCount}
          maxMembersCount={maxMembersCount}
        />
      </div>
    </article>
  );
}
