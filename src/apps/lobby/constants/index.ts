/**
 * 게임 관련 상수들
 */
export const GAME_SETTINGS = {
  MAX_PLAYERS: 8,
  TOTAL_QUESTIONS: 10,
  TIME_PER_QUESTION: 30, // seconds
  MIN_PLAYERS: 1,
} as const;

/**
 * UI 관련 상수들
 */
export const UI_CONSTANTS = {
  ROOM_TITLE_MAX_LENGTH: 50,
  ROOM_TITLE_MIN_LENGTH: 3,
  ANIMATION_DURATION: 300, // milliseconds
} as const;

/**
 * 상태 관련 상수들
 */
export const STATUS_COLORS = {
  ONLINE: 'bg-green-500',
  PLAYING: 'bg-yellow-500',
  AWAY: 'bg-gray-400',
} as const;
