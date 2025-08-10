import { RoomInfo, Participant, Announcement } from '../types';
import { generateRoomTitle, getRandomInt, getRandomBoolean } from '../utils/helpers';

/**
 * 게임 중인 방들 모의 데이터
 */
export const PLAYING_ROOMS: RoomInfo[] = Array.from({ length: 8 }, (_, i) => ({
  roomId: `${i + 21}`,
  title: `진행중인 게임 ${i + 1} - 흥미진진한 퀴즈 배틀!`,
  participantInfo: {
    current: getRandomInt(2, 8),
    max: 8,
  },
  status: 'playing',
  isPrivate: getRandomBoolean(0.3),
}));

/**
 * 대기 중인 방들 모의 데이터
 */
export const WAITING_ROOMS: RoomInfo[] = Array.from({ length: 15 }, (_, i) => {
  const current = getRandomInt(0, 7);
  const max = 8;
  return {
    roomId: `${i + 1}`,
    title: generateRoomTitle(i),
    participantInfo: { current, max },
    status: current >= max ? 'full' : 'waiting',
    isPrivate: getRandomBoolean(0.2),
  } as RoomInfo;
});

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

/**
 * 공지사항 모의 데이터
 */
export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    title: '새로운 퀴즈 카테고리 추가!',
    date: '2025-08-10',
    content: '과학, 역사, 문학 카테고리가 새롭게 추가되었습니다.',
  },
  {
    id: 2,
    title: '주간 랭킹 이벤트',
    date: '2025-08-08',
    content: '이번 주 상위 랭커에게 특별 보상이 지급됩니다!',
  },
  {
    id: 3,
    title: '시스템 점검 안내',
    date: '2025-08-05',
    content: '8월 15일 새벽 2시-4시 시스템 점검이 예정되어 있습니다.',
  },
];
