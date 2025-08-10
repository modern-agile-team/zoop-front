import { useResponsive } from '@/shared/hooks/useResponsive';

import CreateRoomDialog from './components/CreateRoomDialog';
import DesktopLayout from './components/layouts/DesktopLayout';
import MobileLayout from './components/layouts/MobileLayout';
import ResponsiveHeader from './components/ResponsiveHeader';
import {
  PLAYING_ROOMS,
  WAITING_ROOMS,
  PARTICIPANTS,
  ANNOUNCEMENTS,
} from './data/mockData';
import { useCreateRoomDialog } from './hooks/useCreateRoomDialog';

export default function LobbyPage() {
  const { isDesktop } = useResponsive();

  const {
    isOpen: isCreateRoomOpen,
    roomTitle,
    setRoomTitle,
    openDialog: openCreateRoomDialog,
    closeDialog: closeCreateRoomDialog,
    handleCreateRoom,
  } = useCreateRoomDialog();

  const onlineCount = PARTICIPANTS.filter((p) => p.status === 'online').length;

  const layoutProps = {
    waitingRooms: WAITING_ROOMS,
    playingRooms: PLAYING_ROOMS,
    participants: PARTICIPANTS,
    announcements: ANNOUNCEMENTS,
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <ResponsiveHeader
          onlineCount={onlineCount}
          onCreateRoom={openCreateRoomDialog}
        />

        <main
          className="max-w-7xl mx-auto p-3 sm:p-4 lg:p-6 min-h-[calc(100vh-80px)] sm:min-h-[calc(100vh-100px)] lg:min-h-[calc(100vh-120px)]"
          role="main"
        >
          {isDesktop ? (
            <DesktopLayout {...layoutProps} />
          ) : (
            <MobileLayout {...layoutProps} />
          )}
        </main>
      </div>

      <CreateRoomDialog
        open={isCreateRoomOpen}
        onOpenChange={closeCreateRoomDialog}
        roomTitle={roomTitle}
        onRoomTitleChange={setRoomTitle}
        onCreateRoom={handleCreateRoom}
      />
    </>
  );
}
