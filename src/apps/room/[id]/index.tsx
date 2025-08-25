import { useParams, useNavigate } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';

import { Button } from '@/shared/components/ui/button';

import GameInfoCard from './components/GameInfoCard';
import GameRoomHeader from './components/GameRoomHeader';
import PlayersList from './components/PlayersList';
import ReadyControls from './components/ReadyControls';
import { mockGameRoom, mockCurrentUser } from './data/mockData';
import type { GameRoom } from './types';

export default function GameRoomDetailPage() {
  const { roomId } = useParams({ from: '/room/$roomId' });
  const navigate = useNavigate();

  // 실제로는 API나 소켓을 통해 데이터를 받아올 것
  const [room, setRoom] = useState<GameRoom>(mockGameRoom);
  const [currentUser] = useState(mockCurrentUser);

  // 현재 사용자의 플레이어 정보
  const currentPlayer = room.players.find((p) => p.id === currentUser.id);
  const isHost = currentPlayer?.isHost || false;

  // 8명이 모두 모이면 게임 시작 가능
  const canStartGame = room.players.length === room.maxPlayers;

  // 게임 시작
  const handleStartGame = () => {
    if (!isHost || !canStartGame) return;

    // TODO: 게임 시작 로직 구현
    // 실제로는 서버에 게임 시작 요청을 보내고
    // 게임 화면으로 전환되어야 합니다.
    setRoom((prevRoom) => ({
      ...prevRoom,
      status: 'playing',
    }));
  };

  // 로비로 돌아가기
  const handleBackToLobby = () => {
    navigate({ to: '/lobby' });
  };

  // 방 상태가 변경되면 업데이트 (실제로는 소켓 이벤트로 처리)
  useEffect(() => {
    const totalCount = room.players.length;

    setRoom((prevRoom) => ({
      ...prevRoom,
      status: totalCount === room.maxPlayers ? 'ready' : 'waiting',
    }));
  }, [room.players, room.maxPlayers]);

  if (!currentPlayer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            방을 찾을 수 없습니다
          </h1>
          <p className="text-gray-600 mb-4">
            존재하지 않는 방이거나 접근 권한이 없습니다.
          </p>
          <Button onClick={handleBackToLobby}>로비로 돌아가기</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* 헤더 - 뒤로가기 버튼 */}
        <div className="mb-6">
          <Button variant="ghost" onClick={handleBackToLobby} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            로비로 돌아가기
          </Button>
        </div>

        <div className="space-y-6">
          {/* 방 정보 헤더 */}
          <GameRoomHeader room={room} />

          {/* 모바일에서는 세로 배치, 데스크톱에서는 가로 배치 */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* 왼쪽 영역 - 플레이어 목록 */}
            <div className="xl:col-span-2">
              <PlayersList players={room.players} />
            </div>

            {/* 오른쪽 영역 - 준비 상태 컨트롤과 게임 정보 */}
            <div className="xl:col-span-1 space-y-4">
              <ReadyControls
                isHost={isHost}
                canStartGame={canStartGame}
                onStartGame={handleStartGame}
                currentPlayers={room.players.length}
                maxPlayers={room.maxPlayers}
              />

              {/* 게임 정보 카드 */}
              <GameInfoCard
                maxPlayers={room.maxPlayers}
                currentPlayers={room.players.length}
                roomId={roomId}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
