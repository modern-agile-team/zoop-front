import type { GameRoomDto } from '@/lib/orval/_generated/quizzesGameIoBackend.schemas';

/**
 * 게임 룸 상태 정책을 관리하는 유틸리티
 * 모든 룸 상태 판단 로직을 중앙화하여 일관성을 보장합니다.
 */

export interface RoomState {
  isJoinable: boolean;
  isFull: boolean;
  isInProgress: boolean;
  isWaiting: boolean;
}

/**
 * 게임 룸의 전체 상태를 계산합니다.
 */
export function calculateRoomState(room: GameRoomDto): RoomState {
  const { status, currentMembersCount, maxMembersCount } = room;

  const isFull = currentMembersCount >= maxMembersCount;
  const isWaiting = status === 'waiting';
  const isInProgress = status === 'inProgress';
  const isJoinable = isWaiting && !isFull;

  return {
    isJoinable,
    isFull,
    isInProgress,
    isWaiting,
  };
}

/**
 * 룸 상태에 따른 필터링 함수들
 */
export const roomFilters = {
  waiting: (rooms: GameRoomDto[]) =>
    rooms.filter((room) => room.status === 'waiting'),
  inProgress: (rooms: GameRoomDto[]) =>
    rooms.filter((room) => room.status === 'inProgress'),
  joinable: (rooms: GameRoomDto[]) =>
    rooms.filter((room) => calculateRoomState(room).isJoinable),
  full: (rooms: GameRoomDto[]) =>
    rooms.filter((room) => calculateRoomState(room).isFull),
};

/**
 * 룸 상태 확인 함수들
 */
export function isRoomJoinable(room: GameRoomDto): boolean {
  return calculateRoomState(room).isJoinable;
}

export function isRoomFull(room: GameRoomDto): boolean {
  return calculateRoomState(room).isFull;
}

export function isRoomInProgress(room: GameRoomDto): boolean {
  return calculateRoomState(room).isInProgress;
}

export function isRoomWaiting(room: GameRoomDto): boolean {
  return calculateRoomState(room).isWaiting;
}
