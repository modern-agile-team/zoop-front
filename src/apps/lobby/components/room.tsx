import { Button } from '@/shared/components/ui/button';
import { Users, Play, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { RoomInfo } from '../types';

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
  const statusConfig = {
    waiting: {
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      icon: Users,
      text: '입장 가능',
    },
    playing: {
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      icon: Play,
      text: '게임 중',
    },
    full: {
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      icon: Users,
      text: '인원 가득',
    },
  };

  const currentStatus = statusConfig[status];
  const StatusIcon = currentStatus.icon;

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-lg border transition-all duration-300 transform',
        isJoinable
          ? 'border-green-200 bg-white hover:border-green-300 hover:shadow-lg hover:-translate-y-1'
          : status === 'playing'
            ? 'border-yellow-200 bg-white hover:border-yellow-300 hover:shadow-md hover:-translate-y-0.5'
            : 'border-gray-200 bg-gray-50'
      )}
    >
      <div className="flex flex-col gap-8 p-4">
        {/* 상단: 방 번호와 상태 */}
        <div className="flex items-center justify-between">
          <div className="flex gap-8 items-center">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 rounded-lg text-sm font-semibold">
              {roomId}
            </div>

            <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-tight">
              {title}
            </h3>
          </div>

          <div
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium',
              currentStatus.color,
              currentStatus.bgColor
            )}
          >
            <StatusIcon className="w-3 h-3" />
            {currentStatus.text}
          </div>
        </div>

        {/* 하단: 참여 정보와 공개/비공개 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Users className="size-20" />
            <span className="font-medium">{participantInfo.current}</span>
            <span>/</span>
            <span>{participantInfo.max}</span>
          </div>

          {isPrivate && (
            <div className="flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-600 rounded-md text-xs font-medium">
              <Lock className="w-3 h-3" />
              비공개
            </div>
          )}
        </div>

        {/* 참여 버튼 */}
        <Button
          className={cn(
            'w-full h-10 transition-all duration-300 font-medium',
            isJoinable
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : status === 'playing'
                ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          )}
          disabled={status === 'full'}
        >
          {status === 'playing'
            ? '관전하기'
            : status === 'full'
              ? '인원 가득'
              : '참여하기'}
        </Button>
      </div>
    </div>
  );
}
