import type { Participant } from '../types';

/**
 * 참여자 목록 모의 데이터
 */
export const PARTICIPANTS: Participant[] = [
  { id: '1', name: '퀴즈마스터', status: 'online', isHost: true, tier: 'gold' },
  { id: '2', name: '브레인킹', status: 'online', tier: 'silver' },
  { id: '3', name: '상식박사', status: 'playing', tier: 'bronze' },
  { id: '4', name: '지식천재', status: 'online', tier: 'platinum' },
  { id: '5', name: '퀴즈러버', status: 'away', tier: 'gold' },
];
