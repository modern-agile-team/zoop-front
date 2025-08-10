import { Trophy, Users, Zap } from 'lucide-react';

import type { FeatureItem, StatItem } from '../types';

export const FEATURES: FeatureItem[] = [
  {
    icon: Zap,
    title: '실시간 대결',
    color: 'text-yellow-400',
  },
  {
    icon: Users,
    title: '멀티플레이어',
    color: 'text-blue-400',
  },
  {
    icon: Trophy,
    title: '랭킹 시스템',
    color: 'text-orange-400',
  },
];

export const STATS: StatItem[] = [
  { value: '1,234+', label: '활성 유저' },
  { value: '567', label: '진행 중인 게임' },
  { value: '89,012', label: '총 문제 수' },
];
