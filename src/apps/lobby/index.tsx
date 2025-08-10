import { Users, Play } from 'lucide-react';
import { useState } from 'react';
import Room from './components/room';
import { LobbyScrollSection } from './components/Section';
import LobbyHeader from './components/LobbyHeader';
import CreateRoomDialog from './components/CreateRoomDialog';
import ParticipantCard from './components/ParticipantCard';
import AnnouncementCard from './components/AnnouncementCard';
import { PLAYING_ROOMS, WAITING_ROOMS, PARTICIPANTS, ANNOUNCEMENTS } from './data/mockData';

export default function LobbyPage() {
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false);
  const [roomTitle, setRoomTitle] = useState('');

  const handleCreateRoom = () => {
    if (roomTitle.trim()) {
      // TODO: 실제 방 생성 로직
      console.log('방 생성:', roomTitle);
      setRoomTitle('');
      setIsCreateRoomOpen(false);
    }
  };

  const onlineCount = PARTICIPANTS.filter((p) => p.status === 'online').length;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <LobbyHeader
          onlineCount={onlineCount}
          onCreateRoom={() => setIsCreateRoomOpen(true)}
        />

        <div className="max-w-7xl mx-auto p-6 h-[calc(100vh-120px)]">
          <div className="grid grid-cols-12 gap-6 h-full">
            {/* 참여자 리스트 */}
            <div className="col-span-2 h-full">
              <LobbyScrollSection>
                <LobbyScrollSection.Header>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    온라인 유저 ({PARTICIPANTS.length})
                  </div>
                </LobbyScrollSection.Header>
                <LobbyScrollSection.Content>
                  <div className="space-y-2 p-4">
                    {PARTICIPANTS.map((participant) => (
                      <ParticipantCard
                        key={participant.id}
                        participant={participant}
                      />
                    ))}
                  </div>
                </LobbyScrollSection.Content>
              </LobbyScrollSection>
            </div>

            {/* 대기방 목록 */}
            <div className="col-span-4 h-full">
              <LobbyScrollSection>
                <LobbyScrollSection.Header>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    대기방 목록 ({WAITING_ROOMS.length})
                  </div>
                </LobbyScrollSection.Header>
                <LobbyScrollSection.Content>
                  <div className="space-y-3 p-4">
                    {WAITING_ROOMS.map((room) => (
                      <Room key={room.roomId} {...room} />
                    ))}
                  </div>
                </LobbyScrollSection.Content>
              </LobbyScrollSection>
            </div>

            {/* 진행중인 방 목록 */}
            <div className="col-span-4 h-full">
              <LobbyScrollSection>
                <LobbyScrollSection.Header>
                  <div className="flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    진행중인 게임 ({PLAYING_ROOMS.length})
                  </div>
                </LobbyScrollSection.Header>
                <LobbyScrollSection.Content>
                  <div className="space-y-3 p-4">
                    {PLAYING_ROOMS.map((room) => (
                      <Room key={room.roomId} {...room} />
                    ))}
                  </div>
                </LobbyScrollSection.Content>
              </LobbyScrollSection>
            </div>

            {/* 공지사항 */}
            <div className="col-span-2 h-full">
              <LobbyScrollSection>
                <LobbyScrollSection.Header>
                  <div className="flex items-center gap-2">📢 공지사항</div>
                </LobbyScrollSection.Header>
                <LobbyScrollSection.Content>
                  <div className="space-y-3 p-3">
                    {ANNOUNCEMENTS.map((announcement) => (
                      <AnnouncementCard
                        key={announcement.id}
                        announcement={announcement}
                      />
                    ))}
                  </div>
                </LobbyScrollSection.Content>
              </LobbyScrollSection>
            </div>
          </div>
        </div>
      </div>

      <CreateRoomDialog
        open={isCreateRoomOpen}
        onOpenChange={setIsCreateRoomOpen}
        roomTitle={roomTitle}
        onRoomTitleChange={setRoomTitle}
        onCreateRoom={handleCreateRoom}
      />
    </>
  );
}
