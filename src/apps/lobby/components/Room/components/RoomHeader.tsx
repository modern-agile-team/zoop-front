import { cn } from '@/lib/utils';

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
  const StatusIcon = statusConfig.icon;

  return (
    <header className="flex items-center justify-between gap-2">
      <div className="flex gap-2 items-center min-w-0 flex-1">
        <span
          className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 text-blue-600 rounded-lg text-xs sm:text-sm font-semibold flex-shrink-0"
          aria-label={`방 번호 ${roomId}`}
        >
          {roomId}
        </span>

        <h3 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2 leading-tight min-w-0">
          {title}
        </h3>
      </div>

      <div
        className={cn(
          'flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-medium flex-shrink-0',
          statusConfig.color,
          statusConfig.bgColor
        )}
        role="status"
        aria-label={`방 상태: ${statusConfig.text}`}
      >
        <StatusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline">{statusConfig.text}</span>
        <span className="sm:hidden text-xs">
          {statusConfig.text.slice(0, 2)}
        </span>
      </div>
    </header>
  );
}
