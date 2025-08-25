import type { GameRoom } from '../types';

// Mock data for development/testing
export const mockGameRoom: GameRoom = {
  id: 'room-123',
  name: '퀴즈왕 되기 도전방',
  status: 'waiting',
  maxPlayers: 8,
  players: [
    {
      id: 'user-1',
      name: '퀴즈마스터',
      isHost: true,
      tier: 'platinum',
    },
    {
      id: 'user-2',
      name: '도전자1',
      isHost: false,
      tier: 'gold',
    },
    {
      id: 'user-3',
      name: '초보자',
      isHost: false,
      tier: 'bronze',
    },
    {
      id: 'user-4',
      name: '실버유저',
      isHost: false,
      tier: 'silver',
    },
    {
      id: 'user-5',
      name: '골드플레이어',
      isHost: false,
      tier: 'gold',
    },
    {
      id: 'user-6',
      name: '브론즈킬러',
      isHost: false,
      tier: 'bronze',
    },
    {
      id: 'user-7',
      name: '플래티넘워너비',
      isHost: false,
      tier: 'silver',
    },
    {
      id: 'user-8',
      name: '퀴즈신동',
      isHost: false,
      tier: 'platinum',
    },
  ],
};

// Mock current user - 실제로는 auth context나 store에서 가져올 것
export const mockCurrentUser = {
  id: 'user-2',
  name: '도전자1',
};
