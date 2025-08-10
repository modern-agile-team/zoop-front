import { cn } from '@/lib/utils';
import {
  useResponsive,
  useResponsiveClasses,
} from '@/shared/hooks/useResponsive';
import { RESPONSIVE_TEXT_SIZE } from '@/shared/utils/responsive';

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

  const roomIdSizeStyles = useResponsiveClasses({
    mobile: 'size-6 text-xs',
    tablet: 'size-6 sm:size-8 text-xs sm:text-sm',
    desktop: 'size-8 text-sm',
  });

  const titleSize = RESPONSIVE_TEXT_SIZE.small[deviceType];

  const statusIconSizeStyles = useResponsiveClasses({
    mobile: 'w-3 h-3',
    tablet: 'w-3 h-3 sm:w-4 sm:h-4',
    desktop: 'w-4 h-4',
  });

  const statusPaddingStyles = useResponsiveClasses({
    mobile: 'px-2 py-1',
    tablet: 'px-2 sm:px-3 py-1 sm:py-1.5',
    desktop: 'px-3 py-1.5',
  });

  const statusGapStyles = useResponsiveClasses({
    mobile: 'gap-1',
    tablet: 'gap-1 sm:gap-1.5',
    desktop: 'gap-1.5',
  });

  return (
    <header className="flex items-center justify-between gap-2">
      <div className="flex gap-2 items-center min-w-0 flex-1">
        <span
          className={`flex items-center justify-center ${roomIdSizeStyles} bg-blue-100 text-blue-600 rounded-lg font-semibold flex-shrink-0`}
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
          `flex items-center ${statusGapStyles} ${statusPaddingStyles} rounded-full text-xs font-medium flex-shrink-0`,
          statusConfig.color,
          statusConfig.bgColor
        )}
        role="status"
        aria-label={`방 상태: ${statusConfig.text}`}
      >
        <StatusIcon className={statusIconSizeStyles} />
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
