import { Users, Play } from 'lucide-react';

import type {
  AccountDto,
  GameRoomDto,
} from '@/lib/orval/_generated/quizzesGameIoBackend.schemas';

import ParticipantCard from '../ParticipantCard';
import Room from '../Room';
import { LobbyScrollSection } from '../Section';

interface MobileLayoutProps {
  waitingRooms: GameRoomDto[];
  playingRooms: GameRoomDto[];
  participants: AccountDto[];
}

export default function MobileLayout({
  waitingRooms,
  playingRooms,
  participants,
}: MobileLayoutProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* 대기방과 진행중인 방을 가로로 배치 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 대기방 목록 */}
        <section
          className="h-[300px] md:h-[400px]"
          aria-label="대기 중인 게임방 목록"
        >
          <LobbyScrollSection>
            <LobbyScrollSection.Header>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                <span className="text-sm sm:text-base">
                  대기방 목록 ({waitingRooms.length})
                </span>
              </div>
            </LobbyScrollSection.Header>
            <LobbyScrollSection.Content>
              <ul className="space-y-2 sm:space-y-3 p-2 sm:p-4" role="list">
                {waitingRooms.map((room) => (
                  <li key={room.id}>
                    <Room {...room} />
                  </li>
                ))}
              </ul>
            </LobbyScrollSection.Content>
          </LobbyScrollSection>
        </section>

        {/* 진행중인 방 목록 */}
        <section
          className="h-[300px] md:h-[400px]"
          aria-label="진행 중인 게임방 목록"
        >
          <LobbyScrollSection>
            <LobbyScrollSection.Header>
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                <span className="text-sm sm:text-base">
                  진행중인 게임 ({playingRooms.length})
                </span>
              </div>
            </LobbyScrollSection.Header>
            <LobbyScrollSection.Content>
              <ul className="space-y-2 sm:space-y-3 p-2 sm:p-4" role="list">
                {playingRooms.map((room) => (
                  <li key={room.id}>
                    <Room {...room} />
                  </li>
                ))}
              </ul>
            </LobbyScrollSection.Content>
          </LobbyScrollSection>
        </section>
      </div>

      {/* 참여자와 공지사항을 가로로 배치 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 참여자 리스트 */}
        <aside
          className="h-[250px] md:h-[300px]"
          aria-label="온라인 사용자 목록"
        >
          <LobbyScrollSection>
            <LobbyScrollSection.Header>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                <span className="text-sm sm:text-base">
                  온라인 유저 ({participants.length})
                </span>
              </div>
            </LobbyScrollSection.Header>
            <LobbyScrollSection.Content>
              <ul className="space-y-2 p-2 sm:p-4" role="list">
                {participants.map((participant) => (
                  <li key={participant.id}>
                    <ParticipantCard participant={participant} />
                  </li>
                ))}
              </ul>
            </LobbyScrollSection.Content>
          </LobbyScrollSection>
        </aside>

        {/* 공지사항 */}
        {/* <aside className="h-[250px] md:h-[300px]" aria-label="공지사항">
          <LobbyScrollSection>
            <LobbyScrollSection.Header>
              <div className="flex items-center gap-2">
                <span
                  role="img"
                  aria-label="공지"
                  className="text-sm sm:text-base"
                >
                  📢
                </span>
                <span className="text-sm sm:text-base">공지사항</span>
              </div>
            </LobbyScrollSection.Header>
            <LobbyScrollSection.Content>
              <ul className="space-y-2 sm:space-y-3 p-2 sm:p-3" role="list">
                {announcements.map((announcement) => (
                  <li key={announcement.id}>
                    <AnnouncementCard announcement={announcement} />
                  </li>
                ))}
              </ul>
            </LobbyScrollSection.Content>
          </LobbyScrollSection>
        </aside> */}
      </div>
    </div>
  );
}
