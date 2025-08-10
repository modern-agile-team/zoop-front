import { Users, Play } from 'lucide-react';

import type { RoomStatus } from '../../../types';

export const getStatusConfig = (status: RoomStatus) => {
  const configs = {
    waiting: {
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      icon: Users,
      text: '입장 가능',
    },
    playing: {
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      icon: Play,
      text: '게임 중',
    },
    full: {
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      icon: Users,
      text: '인원 가득',
    },
  };
  return configs[status];
};

export const getCardStyles = (status: RoomStatus, isJoinable: boolean) => {
  if (isJoinable) {
    return 'border-green-200 bg-white hover:border-green-300 hover:shadow-lg hover:-translate-y-1';
  }

  if (status === 'playing') {
    return 'border-yellow-200 bg-white hover:border-yellow-300 hover:shadow-md hover:-translate-y-0.5';
  }

  return 'border-gray-200 bg-gray-50';
};

export const getButtonStyles = (status: RoomStatus, isJoinable: boolean) => {
  if (isJoinable) {
    return 'bg-blue-600 hover:bg-blue-700 text-white';
  }

  if (status === 'playing') {
    return 'bg-yellow-500 hover:bg-yellow-600 text-white';
  }

  return 'bg-gray-300 text-gray-500 cursor-not-allowed';
};

export const getButtonText = (status: RoomStatus) => {
  switch (status) {
    case 'playing':
      return '관전하기';
    case 'full':
      return '인원 가득';
    default:
      return '참여하기';
  }
};
