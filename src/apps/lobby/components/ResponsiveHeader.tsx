import { useMutation } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { Plus, Gamepad2, Users } from 'lucide-react';
import { overlay } from 'overlay-kit';
import { useState } from 'react';

import { ServerToClientEventNames } from '@/lib/asyncApi/_generated/types';
import { Button } from '@/shared/components/ui/button';
import {
  useResponsive,
  useResponsiveClasses,
} from '@/shared/hooks/useResponsive';
import { gameRoomQuery } from '@/shared/service/api/query/room';
import { useSocketListener } from '@/shared/service/socket/hooks/useSocketListener';
import { RESPONSIVE_TEXT_SIZE } from '@/shared/utils/responsive';
import { toast } from '@/shared/utils/toast';

import CreateRoomDialog from './CreateRoomDialog';

export default function ResponsiveHeader() {
  const { deviceType } = useResponsive();

  const headerPaddingStyles = useResponsiveClasses({
    mobile: 'px-3 sm:px-4 py-3',
    tablet: 'px-4 sm:px-6 py-3 sm:py-4',
    desktop: 'px-6 py-4',
  });

  const logoSizeStyles = useResponsiveClasses({
    mobile: 'size-6',
    tablet: 'size-6 sm:size-8',
    desktop: 'size-8',
  });

  const titleSize = RESPONSIVE_TEXT_SIZE.xlarge[deviceType];

  const gapSizeStyles = useResponsiveClasses({
    mobile: 'gap-2',
    tablet: 'gap-2 sm:gap-3',
    desktop: 'gap-3',
  });

  const buttonGapStyles = useResponsiveClasses({
    mobile: 'gap-2',
    tablet: 'gap-2 sm:gap-4',
    desktop: 'gap-4',
  });

  return (
    <header className="bg-white shadow-sm border-b">
      <div className={`max-w-7xl mx-auto ${headerPaddingStyles}`}>
        <nav className="flex items-center justify-between" role="banner">
          <div className={`flex items-center ${gapSizeStyles}`}>
            <Gamepad2
              className={`${logoSizeStyles} text-blue-600`}
              aria-hidden="true"
            />
            <h1 className={`${titleSize} font-bold text-gray-900`}>
              Quiz Battle
            </h1>
          </div>

          <div
            className={`flex items-center ${buttonGapStyles}`}
            role="complementary"
          >
            <OnlineCounter />
            <CreateRoomButton />
          </div>
        </nav>
      </div>
    </header>
  );
}

function OnlineCounter() {
  const { deviceType } = useResponsive();

  const [count, setCount] = useState(0);

  const containerPaddingStyles = useResponsiveClasses({
    mobile: 'px-2 py-1',
    tablet: 'px-2 sm:px-3 py-1 sm:py-1.5',
    desktop: 'px-3 py-1.5',
  });

  const iconSizeStyles = useResponsiveClasses({
    mobile: 'size-3',
    tablet: 'size-3 sm:size-4',
    desktop: 'size-4',
  });

  const textSizeStyles = useResponsiveClasses({
    mobile: 'text-xs',
    tablet: 'text-xs sm:text-sm',
    desktop: 'text-sm',
  });

  const badgeSizeStyles = useResponsiveClasses({
    mobile: 'min-w-[18px] h-4 px-1.5',
    tablet: 'min-w-[20px] sm:min-w-[24px] h-5 sm:h-6 px-1.5 sm:px-2',
    desktop: 'min-w-[24px] h-6 px-2',
  });

  const gapSizeStyles = useResponsiveClasses({
    mobile: 'gap-1.5',
    tablet: 'gap-1.5 sm:gap-2',
    desktop: 'gap-2',
  });

  useSocketListener(
    ServerToClientEventNames.LOBBY_ACTIVE_ACCOUNT_CHANGED,
    ({ body }) => {
      setCount(body.currentActiveAccountsCount);
    }
  );

  return (
    <div
      className={`flex items-center ${gapSizeStyles} ${containerPaddingStyles} bg-green-50 border border-green-200 rounded-full`}
      role="status"
      aria-label={`현재 온라인 사용자: ${count}명`}
    >
      <Users
        className={`${iconSizeStyles} text-green-600`}
        aria-hidden="true"
      />
      {deviceType !== 'mobile' && (
        <span className={`${textSizeStyles} text-gray-600`}>온라인</span>
      )}
      <span
        className={`inline-flex items-center justify-center ${badgeSizeStyles} bg-green-100 text-green-700 text-xs font-semibold rounded-full`}
      >
        {count}
      </span>
    </div>
  );
}

function CreateRoomButton() {
  const { deviceType } = useResponsive();
  const router = useRouter();
  const buttonSize = deviceType === 'mobile' ? 'sm' : 'default';

  const { mutateAsync: createRoom } = useMutation(gameRoomQuery.createRoom);

  const iconSizeStyles = useResponsiveClasses({
    mobile: 'w-3 h-3',
    tablet: 'w-3 h-3 sm:w-4 sm:h-4',
    desktop: 'w-4 h-4',
  });

  const buttonPaddingStyles = useResponsiveClasses({
    mobile: 'px-3 py-1.5',
    tablet: 'px-3 sm:px-4 py-1.5 sm:py-2',
    desktop: 'px-4 py-2',
  });

  const textSizeStyles = useResponsiveClasses({
    mobile: 'text-sm',
    tablet: 'text-sm sm:text-base',
    desktop: 'text-base',
  });

  const gapSizeStyles = useResponsiveClasses({
    mobile: 'gap-1.5',
    tablet: 'gap-1.5 sm:gap-2',
    desktop: 'gap-2',
  });

  return (
    <>
      <Button
        onClick={async () => {
          overlay.open(({ isOpen, close }) => (
            <CreateRoomDialog
              open={isOpen}
              onOpenChange={close}
              onCreateRoom={async ({ title, quizzesCount }) => {
                try {
                  const roomData = await createRoom({
                    title,
                    quizzesCount,
                  });
                  await router.navigate({
                    to: '/room/$roomId',
                    params: { roomId: roomData.id },
                  });
                  toast.success('방을 생성했습니다.');
                } catch {
                  toast.error('방 생성에 실패했습니다.');
                } finally {
                  close();
                }
              }}
            />
          ));
        }}
        size={buttonSize}
        className={`bg-blue-600 hover:bg-blue-700 text-white flex items-center ${gapSizeStyles} ${textSizeStyles} ${buttonPaddingStyles}`}
        aria-label="새 방 만들기"
      >
        <Plus className={iconSizeStyles} aria-hidden="true" />
        {deviceType === 'mobile' ? (
          <span>방 생성</span>
        ) : (
          <span className="hidden sm:inline">방 만들기</span>
        )}
      </Button>
    </>
  );
}
