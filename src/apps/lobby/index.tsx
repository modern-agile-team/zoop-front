import { Button } from '@/components/ui/button';
import Room from './components/room';
import { LobbyScrollSection } from './components/Section';

const MOCK_ROOMS = Array.from({ length: 20 }, (_, i) => i + 1);

export default function LobbyPage() {
  return (
    <div className="flex flex-col h-screen bg-bg-800">
      <div className="grid grid-cols-4 h-full gap-8 py-16 flex-1 justify-center">
        <LobbyScrollSection>
          <LobbyScrollSection.Header>참여자 리스트</LobbyScrollSection.Header>
          <LobbyScrollSection.Content></LobbyScrollSection.Content>
        </LobbyScrollSection>

        <LobbyScrollSection>
          <LobbyScrollSection.Header>대기방 목록</LobbyScrollSection.Header>
          <LobbyScrollSection.Content>
            <ul className="flex flex-col gap-4 p-4 w-full">
              {MOCK_ROOMS.map((room) => (
                <Room key={room} />
              ))}
            </ul>
          </LobbyScrollSection.Content>
          <LobbyScrollSection.Footer>
            <Button className="flex-1">방 만들기</Button>
          </LobbyScrollSection.Footer>
        </LobbyScrollSection>

        <LobbyScrollSection>
          <LobbyScrollSection.Header>
            진행중인 방 목록
          </LobbyScrollSection.Header>
          <LobbyScrollSection.Content>
            <ul className="flex flex-col gap-4 p-4">
              {MOCK_ROOMS.map((room) => (
                <Room key={room} />
              ))}
            </ul>
          </LobbyScrollSection.Content>
        </LobbyScrollSection>

        <LobbyScrollSection>
          <LobbyScrollSection.Header>공지사항</LobbyScrollSection.Header>
        </LobbyScrollSection>
      </div>
    </div>
  );
}
