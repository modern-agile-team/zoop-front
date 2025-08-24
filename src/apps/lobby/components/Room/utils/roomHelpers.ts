import { Users, Play } from 'lucide-react';

import type { GameRoomDto } from '@/lib/orval/_generated/quizzesGameIoBackend.schemas';

import { calculateRoomState } from '../../../utils/gameRoomPolicy';

/**
 * UI 표시용 상태 설정 정보
 */
export interface StatusConfig {
  color: string;
  bgColor: string;
  icon: typeof Users | typeof Play;
  text: string;
}

/**
 * 룸 상태에 따른 UI 표시 설정을 반환합니다.
 */
export function getStatusConfig(room: GameRoomDto): StatusConfig {
  const state = calculateRoomState(room);

  if (state.isFull) {
    return {
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      icon: Users,
      text: '인원 가득',
    };
  }

  if (state.isInProgress) {
    return {
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      icon: Play,
      text: '게임 중',
    };
  }

  return {
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    icon: Users,
    text: '입장 가능',
  };
}

/**
 * 룸 카드의 CSS 클래스를 반환합니다.
 */
export function getCardStyles(room: GameRoomDto): string {
  const state = calculateRoomState(room);

  if (state.isJoinable) {
    return 'border-green-200 bg-white hover:border-green-300 hover:shadow-lg hover:-translate-y-1';
  }

  if (state.isInProgress) {
    return 'border-yellow-200 bg-white hover:border-yellow-300 hover:shadow-md hover:-translate-y-0.5';
  }

  return 'border-gray-200 bg-gray-50';
}

/**
 * 룸 액션 버튼의 CSS 클래스를 반환합니다.
 */
export function getButtonStyles(room: GameRoomDto): string {
  const state = calculateRoomState(room);

  if (state.isJoinable) {
    return 'bg-blue-600 hover:bg-blue-700 text-white';
  }

  if (state.isInProgress) {
    return 'bg-yellow-500 hover:bg-yellow-600 text-white';
  }

  return 'bg-gray-300 text-gray-500 cursor-not-allowed';
}

/**
 * 룸 액션 버튼의 텍스트를 반환합니다.
 */
export function getButtonText(room: GameRoomDto): string {
  const state = calculateRoomState(room);

  if (state.isFull) {
    return '인원 가득';
  }

  if (state.isInProgress) {
    return '관전하기';
  }

  return '참여하기';
}
