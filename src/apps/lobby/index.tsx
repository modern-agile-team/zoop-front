import { Users, Play } from 'lucide-react';
import Room from './components/Room';
import { LobbyScrollSection } from './components/Section';
import LobbyHeader from './components/LobbyHeader';
import CreateRoomDialog from './components/CreateRoomDialog';
import ParticipantCard from './components/ParticipantCard';
import AnnouncementCard from './components/AnnouncementCard';
import {
  PLAYING_ROOMS,
  WAITING_ROOMS,
  PARTICIPANTS,
  ANNOUNCEMENTS,
} from './data/mockData';
import { useCreateRoomDialog } from './hooks/useCreateRoomDialog';

export default function LobbyPage() {
  const {
    isOpen: isCreateRoomOpen,
    roomTitle,
    setRoomTitle,
    openDialog: openCreateRoomDialog,
    closeDialog: closeCreateRoomDialog,
    handleCreateRoom,
  } = useCreateRoomDialog();

  const onlineCount = PARTICIPANTS.filter((p) => p.status === 'online').length;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <LobbyHeader
          onlineCount={onlineCount}
          onCreateRoom={openCreateRoomDialog}
        />

        <main
          className="max-w-7xl mx-auto p-6 h-[calc(100vh-120px)]"
          role="main"
        >
          <div className="grid grid-cols-12 gap-6 h-full">
            {/* 참여자 리스트 */}
            <aside
              className="col-span-2 h-full"
              aria-label="온라인 사용자 목록"
            >
              <LobbyScrollSection>
                <LobbyScrollSection.Header>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" aria-hidden="true" />
                    온라인 유저 ({PARTICIPANTS.length})
                  </div>
                </LobbyScrollSection.Header>
                <LobbyScrollSection.Content>
                  <ul className="space-y-2 p-4" role="list">
                    {PARTICIPANTS.map((participant) => (
                      <li key={participant.id}>
                        <ParticipantCard participant={participant} />
                      </li>
                    ))}
                  </ul>
                </LobbyScrollSection.Content>
              </LobbyScrollSection>
            </aside>

            {/* 대기방 목록 */}
            <section
              className="col-span-4 h-full"
              aria-label="대기 중인 게임방 목록"
            >
              <LobbyScrollSection>
                <LobbyScrollSection.Header>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" aria-hidden="true" />
                    대기방 목록 ({WAITING_ROOMS.length})
                  </div>
                </LobbyScrollSection.Header>
                <LobbyScrollSection.Content>
                  <ul className="space-y-3 p-4" role="list">
                    {WAITING_ROOMS.map((room) => (
                      <li key={room.roomId}>
                        <Room {...room} />
                      </li>
                    ))}
                  </ul>
                </LobbyScrollSection.Content>
              </LobbyScrollSection>
            </section>

            {/* 진행중인 방 목록 */}
            <section
              className="col-span-4 h-full"
              aria-label="진행 중인 게임방 목록"
            >
              <LobbyScrollSection>
                <LobbyScrollSection.Header>
                  <div className="flex items-center gap-2">
                    <Play className="w-5 h-5" aria-hidden="true" />
                    진행중인 게임 ({PLAYING_ROOMS.length})
                  </div>
                </LobbyScrollSection.Header>
                <LobbyScrollSection.Content>
                  <ul className="space-y-3 p-4" role="list">
                    {PLAYING_ROOMS.map((room) => (
                      <li key={room.roomId}>
                        <Room {...room} />
                      </li>
                    ))}
                  </ul>
                </LobbyScrollSection.Content>
              </LobbyScrollSection>
            </section>

            {/* 공지사항 */}
            <aside className="col-span-2 h-full" aria-label="공지사항">
              <LobbyScrollSection>
                <LobbyScrollSection.Header>
                  <div className="flex items-center gap-2">
                    <span role="img" aria-label="공지">
                      📢
                    </span>
                    공지사항
                  </div>
                </LobbyScrollSection.Header>
                <LobbyScrollSection.Content>
                  <ul className="space-y-3 p-3" role="list">
                    {ANNOUNCEMENTS.map((announcement) => (
                      <li key={announcement.id}>
                        <AnnouncementCard announcement={announcement} />
                      </li>
                    ))}
                  </ul>
                </LobbyScrollSection.Content>
              </LobbyScrollSection>
            </aside>
          </div>
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
