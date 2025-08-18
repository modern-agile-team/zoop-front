// Auto-generated Socket event types

export type { AccountEnteredSocketEventBodyAccount } from './models/AccountEnteredSocketEventBodyAccount';
export type { AccountEnteredSocketEventBody } from './models/AccountEnteredSocketEventBody';
export type { AccountEnteredSocketEvent } from './models/AccountEnteredSocketEvent';

import type { AccountEnteredSocketEvent } from './models/AccountEnteredSocketEvent';

export const enum ServerToClientEventNames {
  ACCOUNT_ENTERED = 'account.entered',
}

export const enum ClientToServerEventNames {
  // 현재 클라이언트에서 서버로 보내는 이벤트가 정의되지 않았습니다
  // AsyncAPI 스펙에서 subscribe 이벤트를 추가하면 여기에 자동으로 생성됩니다
}

// 유틸리티 타입들
export type ServerToClientEventData<T extends ServerToClientEventNames> =
  Parameters<ServerToClientEvents[T]>[0];

export type ClientToServerEventData<T extends ClientToServerEventNames> =
  ClientToServerEvents[T];

// Socket.io 이벤트 맵 정의
export interface ServerToClientEvents {
  /** 유저가 접속했을 때 발생하는 이벤트 */
  [ServerToClientEventNames.ACCOUNT_ENTERED]: (
    data: AccountEnteredSocketEvent
  ) => void;
}

export interface ClientToServerEvents {
  [eventName: string]: (data: unknown) => void;
}
