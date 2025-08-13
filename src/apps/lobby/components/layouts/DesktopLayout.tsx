import { Users, Play } from 'lucide-react';

import ParticipantCard from '../ParticipantCard';
import Room from '../Room';
import { LobbyScrollSection } from '../Section';

import type { Announcement, Participant, RoomInfo } from '../../types';

interface DesktopLayoutProps {
  waitingRooms: RoomInfo[];
  playingRooms: RoomInfo[];
  participants: Participant[];
  announcements: Announcement[];
}

export default function DesktopLayout({
  waitingRooms,
  playingRooms,
  participants,
  announcements,
}: DesktopLayoutProps) {
  return (
    <div className="grid grid-cols-20 gap-6 h-full">
      {/* 참여자 리스트 */}
      <aside className="col-span-4 h-full" aria-label="온라인 사용자 목록">
        <LobbyScrollSection>
          <LobbyScrollSection.Header>
            <div className="flex items-center gap-2 text-nowrap">
              <Users className="w-5 h-5" aria-hidden="true" />
              온라인 유저 ({participants.length})
            </div>
          </LobbyScrollSection.Header>
          <LobbyScrollSection.Content>
            <ul className="space-y-2 p-4" role="list">
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
      {/* <aside className="col-span-4 h-full" aria-label="공지사항">
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
              {announcements.map((announcement) => (
                <li key={announcement.id}>
                  <AnnouncementCard announcement={announcement} />
                </li>
              ))}
            </ul>
          </LobbyScrollSection.Content>
        </LobbyScrollSection>
      </aside> */}

      {/* 대기방 목록 */}
      <section className="col-span-8 h-full" aria-label="대기 중인 게임방 목록">
        <LobbyScrollSection>
          <LobbyScrollSection.Header>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" aria-hidden="true" />
              대기방 목록 ({waitingRooms.length})
            </div>
          </LobbyScrollSection.Header>
          <LobbyScrollSection.Content>
            <ul className="space-y-3 p-4" role="list">
              {waitingRooms.map((room) => (
                <li key={room.roomId}>
                  <Room {...room} />
                </li>
              ))}
            </ul>
          </LobbyScrollSection.Content>
        </LobbyScrollSection>
      </section>

      {/* 진행중인 방 목록 */}
      <section className="col-span-8 h-full" aria-label="진행 중인 게임방 목록">
        <LobbyScrollSection>
          <LobbyScrollSection.Header>
            <div className="flex items-center gap-2">
              <Play className="w-5 h-5" aria-hidden="true" />
              진행중인 게임 ({playingRooms.length})
            </div>
          </LobbyScrollSection.Header>
          <LobbyScrollSection.Content>
            <ul className="space-y-3 p-4" role="list">
              {playingRooms.map((room) => (
                <li key={room.roomId}>
                  <Room {...room} />
                </li>
              ))}
            </ul>
          </LobbyScrollSection.Content>
        </LobbyScrollSection>
      </section>
    </div>
  );
}
