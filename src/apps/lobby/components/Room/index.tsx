import { cn } from '@/lib/utils';
import type { RoomInfo } from '../../types';
import RoomHeader from './components/RoomHeader';
import RoomInfoSection from './components/RoomInfo';
import RoomAction from './components/RoomAction';
import { getStatusConfig, getCardStyles } from './utils/roomHelpers';

interface Props extends RoomInfo {}

export default function Room({
  title,
  roomId,
  participantInfo,
  status = 'waiting',
  isPrivate = false,
}: Props) {
  const isJoinable =
    status === 'waiting' && participantInfo.current < participantInfo.max;
  const statusConfig = getStatusConfig(status);

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
      <div className="flex flex-col gap-2 p-4">
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
