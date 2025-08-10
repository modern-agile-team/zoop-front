import { Button } from '@/shared/components/ui/button';
import { Users, Play, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { RoomInfo, RoomStatus } from '../types';

interface Props extends RoomInfo {}

// 상태별 설정을 중앙화하여 관리
const getStatusConfig = (status: RoomStatus) => {
  const configs = {
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
  return configs[status];
};

// 카드 스타일을 결정하는 함수
const getCardStyles = (status: RoomStatus, isJoinable: boolean) => {
  if (isJoinable) {
    return 'border-green-200 bg-white hover:border-green-300 hover:shadow-lg hover:-translate-y-1';
  }

  if (status === 'playing') {
    return 'border-yellow-200 bg-white hover:border-yellow-300 hover:shadow-md hover:-translate-y-0.5';
  }

  return 'border-gray-200 bg-gray-50';
};

// 버튼 스타일을 결정하는 함수
const getButtonStyles = (status: RoomStatus, isJoinable: boolean) => {
  if (isJoinable) {
    return 'bg-blue-600 hover:bg-blue-700 text-white';
  }

  if (status === 'playing') {
    return 'bg-yellow-500 hover:bg-yellow-600 text-white';
  }

  return 'bg-gray-300 text-gray-500 cursor-not-allowed';
};

// 버튼의 접근성과 상태를 결정하는 함수
const getButtonProps = (status: RoomStatus) => {
  const isDisabled = status === 'full';
  const ariaLabel = getButtonAriaLabel(status);

  return {
    disabled: isDisabled,
    'aria-label': ariaLabel,
  };
};

// 버튼의 접근성 라벨을 결정하는 함수
const getButtonAriaLabel = (status: RoomStatus) => {
  switch (status) {
    case 'playing':
      return '게임 관전하기';
    case 'full':
      return '방이 가득 참 - 참여 불가';
    default:
      return '방에 참여하기';
  }
};

// 버튼 텍스트를 결정하는 함수
const getButtonText = (status: RoomStatus) => {
  switch (status) {
    case 'playing':
      return '관전하기';
    case 'full':
      return '인원 가득';
    default:
      return '참여하기';
  }
};

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
  const StatusIcon = statusConfig.icon;

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-lg border transition-all duration-300 transform',
        getCardStyles(status, isJoinable)
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
              statusConfig.color,
              statusConfig.bgColor
            )}
          >
            <StatusIcon className="w-3 h-3" />
            {statusConfig.text}
          </div>
        </div>

        {/* 하단: 참여 정보와 공개/비공개 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 px-2 py-1 bg-gray-50 rounded-md">
            <Users className="size-12 text-gray-500" />
            <span className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">
                {participantInfo.current}
              </span>
              <span className="text-gray-400 mx-1">/</span>
              <span className="text-gray-600">{participantInfo.max}</span>
            </span>
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
          {...getButtonProps(status)}
          className={cn(
            'w-full h-10 transition-all duration-300 font-medium',
            getButtonStyles(status, isJoinable)
          )}
        >
          {getButtonText(status)}
        </Button>
      </div>
    </div>
  );
}
