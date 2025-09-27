import type { LobbyGameRoomCreatedSocketEvent } from '@/lib/asyncApi/_generated/models/LobbyGameRoomCreatedSocketEvent';
import type { GameRoomDto } from '@/lib/orval/_generated/quizzesGameIoBackend.schemas';

import type { UserTier } from '../types';

/**
 * 유저의 티어에 따른 아이콘을 반환합니다.
 */
export const getTierIcon = (tier: UserTier): string => {
  switch (tier) {
    case 'platinum':
      return '💎';
    case 'gold':
      return '🥇';
    case 'silver':
      return '🥈';
    case 'bronze':
      return '🥉';
    default:
      return '⭐';
  }
};

/**
 * 방 제목을 생성하는 헬퍼 함수
 */
export const generateRoomTitle = (index: number): string => {
  const titles = [
    '재밌는 퀴즈',
    '도전! 상식왕',
    '브레인 배틀',
    '지식 경연',
    '퀴즈 마스터',
  ];
  return `${titles[index % titles.length]} ${index + 1}`;
};

/**
 * 랜덤 숫자 생성 헬퍼 함수
 */
export const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * 랜덤 boolean 값 생성 (특정 확률로)
 */
export const getRandomBoolean = (probability: number = 0.5): boolean => {
  return Math.random() < probability;
};

/**
 * 게임 방 생성 이벤트로부터 GameRoomDto 객체를 생성합니다.
 */
export const roomFromEvent = (
  event: LobbyGameRoomCreatedSocketEvent
): GameRoomDto => {
  const { body, timestamp } = event;
  const hostMember =
    body.members.find((member) => member.role === 'host') ?? body.members[0];

  return {
    createdAt: timestamp,
    id: body.gameRoomId,
    status: body.status,
    title: body.title,
    quizzesCount: body.quizzesCount,
    updatedAt: timestamp,
    currentMembersCount: body.currentMembersCount,
    hostId: hostMember.accountId,
    members: body.members.map((member) => ({
      ...member,
      createdAt: timestamp,
      updatedAt: timestamp,
      gameRoomId: body.gameRoomId,
    })),
    maxMembersCount: body.maxPlayers,
    quizTimeLimitInSeconds: body.quizTimeLimitInSeconds,
  };
};
