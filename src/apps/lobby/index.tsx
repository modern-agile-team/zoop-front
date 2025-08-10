import { Button } from '../../shared/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../shared/components/ui/dialog';
import { Input } from '../../shared/components/ui/input';
import { Label } from '../../shared/components/ui/label';
import { Plus, Gamepad2, Users, Crown, Play } from 'lucide-react';
import { useState } from 'react';
import Room from './components/room';
import { LobbyScrollSection } from './components/Section';

type RoomInfo = {
  roomId: string;
  title: string;
  participantInfo: {
    current: number;
    max: number;
  };
  status: 'waiting' | 'playing' | 'full';
  isPrivate?: boolean;
};

// 게임 중인 방들
const PLAYING_ROOMS: RoomInfo[] = Array.from({ length: 8 }, (_, i) => ({
  roomId: `${i + 21}`,
  title: `진행중인 게임 ${i + 1} - 흥미진진한 퀴즈 배틀!`,
  participantInfo: {
    current: Math.floor(Math.random() * 8) + 2,
    max: 8,
  },
  status: 'playing',
  isPrivate: Math.random() > 0.7,
}));

// 대기 중인 방들
const WAITING_ROOMS: RoomInfo[] = Array.from({ length: 15 }, (_, i) => {
  const current = Math.floor(Math.random() * 7);
  const max = 8;
  return {
    roomId: `${i + 1}`,
    title: `${['재밌는 퀴즈', '도전! 상식왕', '브레인 배틀', '지식 경연', '퀴즈 마스터'][i % 5]} ${i + 1}`,
    participantInfo: { current, max },
    status: current >= max ? 'full' : 'waiting',
    isPrivate: Math.random() > 0.8,
  } as RoomInfo;
});

// 참여자 목록 (모의 데이터)
const PARTICIPANTS = [
  { id: '1', name: '퀴즈마스터', status: 'online', isHost: true, tier: 'gold' },
  { id: '2', name: '브레인킹', status: 'online', tier: 'silver' },
  { id: '3', name: '상식박사', status: 'playing', tier: 'bronze' },
  { id: '4', name: '지식천재', status: 'online', tier: 'platinum' },
  { id: '5', name: '퀴즈러버', status: 'away', tier: 'gold' },
];

const ANNOUNCEMENTS = [
  { id: 1, title: '새로운 퀴즈 카테고리 추가!', date: '2025-08-10', content: '과학, 역사, 문학 카테고리가 새롭게 추가되었습니다.' },
  { id: 2, title: '주간 랭킹 이벤트', date: '2025-08-08', content: '이번 주 상위 랭커에게 특별 보상이 지급됩니다!' },
  { id: 3, title: '시스템 점검 안내', date: '2025-08-05', content: '8월 15일 새벽 2시-4시 시스템 점검이 예정되어 있습니다.' },
];

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

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'platinum': return '💎';
      case 'gold': return '🥇';
      case 'silver': return '🥈';
      case 'bronze': return '🥉';
      default: return '⭐';
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* 헤더 */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Gamepad2 className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Quiz Battle</h1>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  온라인: <span className="font-semibold text-green-600">{PARTICIPANTS.filter(p => p.status === 'online').length}</span>
                </div>
                <Button
                  onClick={() => setIsCreateRoomOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  방 만들기
                </Button>
              </div>
            </div>
          </div>
        </header>

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
                      <div key={participant.id} className="flex items-center gap-3 p-3 rounded-lg bg-white hover:bg-gray-50 transition-colors">
                        <div className={`w-3 h-3 rounded-full ${
                          participant.status === 'online' ? 'bg-green-500' :
                          participant.status === 'playing' ? 'bg-yellow-500' : 'bg-gray-400'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1">
                            {participant.isHost && <Crown className="w-4 h-4 text-yellow-500" />}
                            <span className="text-sm font-medium text-gray-900 truncate">
                              {participant.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <span>{getTierIcon(participant.tier)}</span>
                            <span className="capitalize">{participant.tier}</span>
                          </div>
                        </div>
                      </div>
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
                  <div className="flex items-center gap-2">
                    📢 공지사항
                  </div>
                </LobbyScrollSection.Header>
                <LobbyScrollSection.Content>
                  <div className="space-y-3 p-3">
                    {ANNOUNCEMENTS.map((announcement) => (
                      <div key={announcement.id} className="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-200 cursor-pointer border border-blue-100 hover:border-blue-200">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">
                          {announcement.title}
                        </h4>
                        <p className="text-xs text-gray-600 mb-2 line-clamp-3 leading-relaxed">
                          {announcement.content}
                        </p>
                        <span className="text-xs text-blue-600 font-medium">{announcement.date}</span>
                      </div>
                    ))}
                  </div>
                </LobbyScrollSection.Content>
              </LobbyScrollSection>
            </div>
          </div>
        </div>
      </div>

      {/* 방 생성 다이얼로그 */}
      <Dialog open={isCreateRoomOpen} onOpenChange={setIsCreateRoomOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>새로운 게임 방 만들기</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="roomTitle">방 제목</Label>
              <Input
                id="roomTitle"
                placeholder="재밌는 퀴즈 게임에 참여하세요!"
                value={roomTitle}
                onChange={(e) => setRoomTitle(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-blue-900 mb-2">게임 설정</h4>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• 최대 인원: 8명</li>
                <li>• 문제 수: 10문제</li>
                <li>• 제한 시간: 문제당 30초</li>
              </ul>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateRoomOpen(false)}
            >
              취소
            </Button>
            <Button
              onClick={handleCreateRoom}
              disabled={!roomTitle.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              방 만들기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
