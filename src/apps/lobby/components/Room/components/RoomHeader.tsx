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

export default function RoomHeader({ roomId, title, statusConfig }: RoomHeaderProps) {
  const StatusIcon = statusConfig.icon;

  return (
    <header className="flex items-center justify-between">
      <div className="flex gap-8 items-center">
        <span
          className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 rounded-lg text-sm font-semibold"
          aria-label={`방 번호 ${roomId}`}
        >
          {roomId}
        </span>

        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-tight">
          {title}
        </h3>
      </div>

      <div
        className={cn(
          'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium',
          statusConfig.color,
          statusConfig.bgColor
        )}
        role="status"
        aria-label={`방 상태: ${statusConfig.text}`}
      >
        <StatusIcon className="w-3 h-3" />
        {statusConfig.text}
      </div>
    </header>
  );
}
