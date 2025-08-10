import { cn } from '@/lib/utils';
import { useResponsive } from '@/shared/hooks/useResponsive';
import {
  getResponsiveClasses,
  RESPONSIVE_TEXT_SIZE,
} from '@/shared/utils/responsive';

interface RoomHeaderProps {
  roomId: string;
  title: string;
  statusConfig: {
    color: string;
    bgColor: string;
    icon: React.ComponentType<{ className?: string }>;
    text: string;
  };
}

export default function RoomHeader({
  roomId,
  title,
  statusConfig,
}: RoomHeaderProps) {
  const { deviceType } = useResponsive();
  const StatusIcon = statusConfig.icon;

  const roomIdSize = getResponsiveClasses(deviceType, {
    mobile: 'w-8 h-8 text-xs',
    tablet: 'w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm',
    desktop: 'w-10 h-10 text-sm',
  });

  const titleSize = RESPONSIVE_TEXT_SIZE.small[deviceType];

  const statusIconSize = getResponsiveClasses(deviceType, {
    mobile: 'w-3 h-3',
    tablet: 'w-3 h-3 sm:w-4 sm:h-4',
    desktop: 'w-4 h-4',
  });

  const statusPadding = getResponsiveClasses(deviceType, {
    mobile: 'px-2 py-1',
    tablet: 'px-2 sm:px-3 py-1 sm:py-1.5',
    desktop: 'px-3 py-1.5',
  });

  const statusGap = getResponsiveClasses(deviceType, {
    mobile: 'gap-1',
    tablet: 'gap-1 sm:gap-1.5',
    desktop: 'gap-1.5',
  });

  return (
    <header className="flex items-center justify-between gap-2">
      <div className="flex gap-2 items-center min-w-0 flex-1">
        <span
          className={`flex items-center justify-center ${roomIdSize} bg-blue-100 text-blue-600 rounded-lg font-semibold flex-shrink-0`}
          aria-label={`방 번호 ${roomId}`}
        >
          {roomId}
        </span>

        <h3
          className={`${titleSize} font-semibold text-gray-900 line-clamp-2 leading-tight min-w-0`}
        >
          {title}
        </h3>
      </div>

      <div
        className={cn(
          `flex items-center ${statusGap} ${statusPadding} rounded-full text-xs font-medium flex-shrink-0`,
          statusConfig.color,
          statusConfig.bgColor
        )}
        role="status"
        aria-label={`방 상태: ${statusConfig.text}`}
      >
        <StatusIcon className={statusIconSize} />
        {deviceType === 'desktop' ? (
          <span>{statusConfig.text}</span>
        ) : (
          <>
            <span className="hidden sm:inline">{statusConfig.text}</span>
            <span className="sm:hidden text-xs">
              {statusConfig.text.slice(0, 2)}
            </span>
          </>
        )}
      </div>
    </header>
  );
}
