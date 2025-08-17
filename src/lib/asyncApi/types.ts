// Auto-generated Socket event types

export type { AccountEnteredSocketEventBodyAccount } from './models/AccountEnteredSocketEventBodyAccount';
export type { AccountEnteredSocketEventBody } from './models/AccountEnteredSocketEventBody';
export type { AccountEnteredSocketEvent } from './models/AccountEnteredSocketEvent';

import type { AccountEnteredSocketEvent } from './models/AccountEnteredSocketEvent';

// Socket.io 이벤트 맵 정의
export interface ServerToClientEvents {
  'account.entered': (data: AccountEnteredSocketEvent) => void;
}

export interface ClientToServerEvents {
  // 클라이언트에서 서버로 보내는 이벤트들
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [event: string]: (...args: any[]) => void;
}
