// Auto-generated Socket event types

export type { AccountEnteredSocketEventBodyAccount } from './models/AccountEnteredSocketEventBodyAccount';
export type { AccountEnteredSocketEventBody } from './models/AccountEnteredSocketEventBody';
export type { AccountEnteredSocketEvent } from './models/AccountEnteredSocketEvent';

import type { AccountEnteredSocketEvent } from './models/AccountEnteredSocketEvent';
import type { AccountEnteredSocketEventBody } from './models/AccountEnteredSocketEventBody';
import type { AccountEnteredSocketEventBodyAccount } from './models/AccountEnteredSocketEventBodyAccount';

// Socket.io 이벤트 맵 정의
export interface ServerToClientEvents {
  /** 유저가 접속했을 때 발생하는 이벤트 */
  'account.entered': (data: AccountEnteredSocketEvent) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ClientToServerEvents {
  // 현재 클라이언트에서 서버로 보내는 이벤트가 정의되지 않았습니다
  // AsyncAPI 스펙에서 subscribe 이벤트를 추가하면 여기에 자동으로 생성됩니다
}

// 유틸리티 타입들
export type SocketEventNames = keyof ServerToClientEvents;
export type SocketEventData<T extends SocketEventNames> = Parameters<
  ServerToClientEvents[T]
>[0];

// 타입 가드 함수들
export const isAccountEnteredSocketEventBodyAccount = (
  data: unknown
): data is AccountEnteredSocketEventBodyAccount => {
  return typeof data === 'object' && data !== null && 'eventName' in data;
};

export const isAccountEnteredSocketEventBody = (
  data: unknown
): data is AccountEnteredSocketEventBody => {
  return typeof data === 'object' && data !== null && 'eventName' in data;
};

export const isAccountEnteredSocketEvent = (
  data: unknown
): data is AccountEnteredSocketEvent => {
  return typeof data === 'object' && data !== null && 'eventName' in data;
};
