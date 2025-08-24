// Auto-generated Socket event types

import type { AccountEnteredSocketEvent } from './models/AccountEnteredSocketEvent';
import type { GameRoomMemberJoinedSocketEvent } from './models/GameRoomMemberJoinedSocketEvent';
import type { GameRoomSubscribeDto } from './models/GameRoomSubscribeDto';

export const enum ServerToClientEventNames {
  ACCOUNT_ENTERED = 'account.entered',
  GAME_ROOM_MEMBER_JOINED = 'game_room.member_joined',
}

export const enum ClientToServerEventNames {
  GAME_ROOM_SUBSCRIBE = 'game_room.subscribe',
}

// 유틸리티 타입들
export type ServerToClientEventData<T extends ServerToClientEventNames> =
  Parameters<ServerToClientEvents[T]>[0];

export type ClientToServerEventData<T extends ClientToServerEventNames> =
  Parameters<ClientToServerEvents[T]>[0];

// Socket.io 이벤트 맵 정의
export interface ServerToClientEvents {
  /** 유저가 접속했을 때 발생하는 이벤트 */
  [ServerToClientEventNames.ACCOUNT_ENTERED]: (
    data: AccountEnteredSocketEvent
  ) => void;
  /** 유저가 게임방에 접속 */
  [ServerToClientEventNames.GAME_ROOM_MEMBER_JOINED]: (
    data: GameRoomMemberJoinedSocketEvent
  ) => void;
}

export interface ClientToServerEvents {
  /**  */
  [ClientToServerEventNames.GAME_ROOM_SUBSCRIBE]: (
    data: GameRoomSubscribeDto
  ) => void;
}
