import { Plus, Gamepad2, Users } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { useResponsive } from '@/shared/hooks/useResponsive';
import {
  getResponsiveClasses,
  RESPONSIVE_TEXT_SIZE,
} from '@/shared/utils/responsive';

interface ResponsiveHeaderProps {
  onlineCount: number;
  onCreateRoom: () => void;
}

export default function ResponsiveHeader({
  onlineCount,
  onCreateRoom,
}: ResponsiveHeaderProps) {
  const { deviceType } = useResponsive();

  const headerPadding = getResponsiveClasses(deviceType, {
    mobile: 'px-3 sm:px-4 py-3',
    tablet: 'px-4 sm:px-6 py-3 sm:py-4',
    desktop: 'px-6 py-4',
  });

  const logoSize = getResponsiveClasses(deviceType, {
    mobile: 'size-6',
    tablet: 'size-6 sm:size-8',
    desktop: 'size-8',
  });

  const titleSize = RESPONSIVE_TEXT_SIZE.xlarge[deviceType];

  const gapSize = getResponsiveClasses(deviceType, {
    mobile: 'gap-2',
    tablet: 'gap-2 sm:gap-3',
    desktop: 'gap-3',
  });

  const buttonGap = getResponsiveClasses(deviceType, {
    mobile: 'gap-2',
    tablet: 'gap-2 sm:gap-4',
    desktop: 'gap-4',
  });

  return (
    <header className="bg-white shadow-sm border-b">
      <div className={`max-w-7xl mx-auto ${headerPadding}`}>
        <nav className="flex items-center justify-between" role="banner">
          <div className={`flex items-center ${gapSize}`}>
            <Gamepad2
              className={`${logoSize} text-blue-600`}
              aria-hidden="true"
            />
            <h1 className={`${titleSize} font-bold text-gray-900`}>
              Quiz Battle
            </h1>
          </div>

          <div
            className={`flex items-center ${buttonGap}`}
            role="complementary"
          >
            <OnlineCounter count={onlineCount} deviceType={deviceType} />
            <CreateRoomButton onClick={onCreateRoom} deviceType={deviceType} />
          </div>
        </nav>
      </div>
    </header>
  );
}

interface OnlineCounterProps {
  count: number;
  deviceType: 'mobile' | 'tablet' | 'desktop';
}

function OnlineCounter({ count, deviceType }: OnlineCounterProps) {
  const containerPadding = getResponsiveClasses(deviceType, {
    mobile: 'px-2 py-1',
    tablet: 'px-2 sm:px-3 py-1 sm:py-1.5',
    desktop: 'px-3 py-1.5',
  });

  const iconSize = getResponsiveClasses(deviceType, {
    mobile: 'size-3',
    tablet: 'size-3 sm:size-4',
    desktop: 'size-4',
  });

  const textSize = getResponsiveClasses(deviceType, {
    mobile: 'text-xs',
    tablet: 'text-xs sm:text-sm',
    desktop: 'text-sm',
  });

  const badgeSize = getResponsiveClasses(deviceType, {
    mobile: 'min-w-[18px] h-4 px-1.5',
    tablet: 'min-w-[20px] sm:min-w-[24px] h-5 sm:h-6 px-1.5 sm:px-2',
    desktop: 'min-w-[24px] h-6 px-2',
  });

  const gapSize = getResponsiveClasses(deviceType, {
    mobile: 'gap-1.5',
    tablet: 'gap-1.5 sm:gap-2',
    desktop: 'gap-2',
  });

  return (
    <div
      className={`flex items-center ${gapSize} ${containerPadding} bg-green-50 border border-green-200 rounded-full`}
      role="status"
      aria-label={`현재 온라인 사용자: ${count}명`}
    >
      <Users className={`${iconSize} text-green-600`} aria-hidden="true" />
      {deviceType !== 'mobile' && (
        <span className={`${textSize} text-gray-600`}>온라인</span>
      )}
      <span
        className={`inline-flex items-center justify-center ${badgeSize} bg-green-100 text-green-700 text-xs font-semibold rounded-full`}
      >
        {count}
      </span>
    </div>
  );
}

interface CreateRoomButtonProps {
  onClick: () => void;
  deviceType: 'mobile' | 'tablet' | 'desktop';
}

function CreateRoomButton({ onClick, deviceType }: CreateRoomButtonProps) {
  const buttonSize = deviceType === 'mobile' ? 'sm' : 'default';

  const iconSize = getResponsiveClasses(deviceType, {
    mobile: 'w-3 h-3',
    tablet: 'w-3 h-3 sm:w-4 sm:h-4',
    desktop: 'w-4 h-4',
  });

  const buttonPadding = getResponsiveClasses(deviceType, {
    mobile: 'px-3 py-1.5',
    tablet: 'px-3 sm:px-4 py-1.5 sm:py-2',
    desktop: 'px-4 py-2',
  });

  const textSize = getResponsiveClasses(deviceType, {
    mobile: 'text-sm',
    tablet: 'text-sm sm:text-base',
    desktop: 'text-base',
  });

  const gapSize = getResponsiveClasses(deviceType, {
    mobile: 'gap-1.5',
    tablet: 'gap-1.5 sm:gap-2',
    desktop: 'gap-2',
  });

  return (
    <Button
      onClick={onClick}
      size={buttonSize}
      className={`bg-blue-600 hover:bg-blue-700 text-white flex items-center ${gapSize} ${textSize} ${buttonPadding}`}
      aria-label="새 방 만들기"
    >
      <Plus className={iconSize} aria-hidden="true" />
      {deviceType === 'mobile' ? (
        <span>방 생성</span>
      ) : (
        <span className="hidden sm:inline">방 만들기</span>
      )}
    </Button>
  );
}
