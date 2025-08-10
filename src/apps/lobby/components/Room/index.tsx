import { cn } from '@/lib/utils';
import { useResponsiveClasses } from '@/shared/hooks/useResponsive';

import RoomAction from './components/RoomAction';
import RoomHeader from './components/RoomHeader';
import RoomInfoSection from './components/RoomInfo';
import { getStatusConfig, getCardStyles } from './utils/roomHelpers';

import type { RoomInfo } from '../../types';

export default function Room({
  title,
  roomId,
  participantInfo,
  status = 'waiting',
  isPrivate = false,
}: RoomInfo) {
  const isJoinable =
    status === 'waiting' && participantInfo.current < participantInfo.max;
  const statusConfig = getStatusConfig(status);

  const cardPaddingStyles = useResponsiveClasses({
    mobile: 'p-3',
    tablet: 'p-3 sm:p-4',
    desktop: 'p-4',
  });

  return (
    <article
      className={cn(
        'group relative overflow-hidden rounded-lg border transition-all duration-300 transform',
        getCardStyles(status, isJoinable)
      )}
      role="button"
      tabIndex={0}
      aria-label={`방 ${roomId}: ${title} - ${statusConfig.text}`}
    >
      <div className={`flex flex-col gap-2 ${cardPaddingStyles}`}>
        <RoomHeader roomId={roomId} title={title} statusConfig={statusConfig} />

        <RoomInfoSection
          participantInfo={participantInfo}
          isPrivate={isPrivate}
        />

        <RoomAction status={status} isJoinable={isJoinable} roomId={roomId} />
      </div>
    </article>
  );
}
