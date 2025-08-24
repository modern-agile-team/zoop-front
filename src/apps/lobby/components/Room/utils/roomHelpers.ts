import { Users, Play } from 'lucide-react';

import type { GameRoomDtoStatus } from '@/lib/orval/_generated/quizzesGameIoBackend.schemas';

export const getStatusConfig = ({
  status,
  currentMembersCount,
  maxMembersCount,
}: {
  status: GameRoomDtoStatus;
  currentMembersCount: number;
  maxMembersCount: number;
}) => {
  const full = currentMembersCount >= maxMembersCount;

  if (full) {
    return {
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      icon: Users,
      text: '인원 가득',
    };
  }

  if (status === 'inProgress') {
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
};

export const getCardStyles = ({
  status,
  currentMembersCount,
  maxMembersCount,
}: {
  status: GameRoomDtoStatus;
  currentMembersCount: number;
  maxMembersCount: number;
}) => {
  const isJoinable =
    status === 'waiting' && currentMembersCount < maxMembersCount;

  if (isJoinable) {
    return 'border-green-200 bg-white hover:border-green-300 hover:shadow-lg hover:-translate-y-1';
  }

  if (status === 'inProgress') {
    return 'border-yellow-200 bg-white hover:border-yellow-300 hover:shadow-md hover:-translate-y-0.5';
  }

  return 'border-gray-200 bg-gray-50';
};

export const getButtonStyles = ({
  status,
  currentMembersCount,
  maxMembersCount,
}: {
  status: GameRoomDtoStatus;
  currentMembersCount: number;
  maxMembersCount: number;
}) => {
  const isJoinable =
    status === 'waiting' && currentMembersCount < maxMembersCount;

  if (isJoinable) {
    return 'bg-blue-600 hover:bg-blue-700 text-white';
  }

  if (status === 'inProgress') {
    return 'bg-yellow-500 hover:bg-yellow-600 text-white';
  }

  return 'bg-gray-300 text-gray-500 cursor-not-allowed';
};

export const getButtonText = ({
  status,
  currentMembersCount,
  maxMembersCount,
}: {
  status: GameRoomDtoStatus;
  currentMembersCount: number;
  maxMembersCount: number;
}) => {
  const full = currentMembersCount >= maxMembersCount;

  if (full) {
    return '인원 가득';
  }

  switch (status) {
    case 'inProgress':
      return '관전하기';
    default:
      return '참여하기';
  }
};
