// Auto-generated Socket event types

import type { AccountEnteredSocketEvent } from './models/AccountEnteredSocketEvent';
import type { GameRoomClosedSocketEvent } from './models/GameRoomClosedSocketEvent';
import type { GameRoomCreatedSocketEvent } from './models/GameRoomCreatedSocketEvent';
import type { GameRoomMemberJoinedSocketEvent } from './models/GameRoomMemberJoinedSocketEvent';
import type { GameRoomMemberLeftSocketEvent } from './models/GameRoomMemberLeftSocketEvent';
import type { GameRoomMemberRoleChangedSocketEvent } from './models/GameRoomMemberRoleChangedSocketEvent';

export const enum ServerToClientEventNames {
  ACCOUNT_ENTERED = 'account.entered',
  GAME_ROOM_CLOSED = 'game_room.closed',
  GAME_ROOM_CREATED = 'game_room.created',
  GAME_ROOM_MEMBER_JOINED = 'game_room.member_joined',
  GAME_ROOM_MEMBER_LEFT = 'game_room.member_left',
  GAME_ROOM_MEMBER_ROLE_CHANGED = 'game_room.member_role_changed',
}

export const enum ClientToServerEventNames {
  // 현재 클라이언트에서 서버로 보내는 이벤트가 정의되지 않았습니다
  // AsyncAPI 스펙에서 subscribe 이벤트를 추가하면 여기에 자동으로 생성됩니다
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
  /** 게임방이 폐쇄됨 */
  [ServerToClientEventNames.GAME_ROOM_CLOSED]: (
    data: GameRoomClosedSocketEvent
  ) => void;
  /** 게임방이 생성됨 */
  [ServerToClientEventNames.GAME_ROOM_CREATED]: (
    data: GameRoomCreatedSocketEvent
  ) => void;
  /** 유저가 게임방에 접속 */
  [ServerToClientEventNames.GAME_ROOM_MEMBER_JOINED]: (
    data: GameRoomMemberJoinedSocketEvent
  ) => void;
  /** 유저가 게임방에 퇴장 */
  [ServerToClientEventNames.GAME_ROOM_MEMBER_LEFT]: (
    data: GameRoomMemberLeftSocketEvent
  ) => void;
  /** 유저의 게임방 역할이 변경 */
  [ServerToClientEventNames.GAME_ROOM_MEMBER_ROLE_CHANGED]: (
    data: GameRoomMemberRoleChangedSocketEvent
  ) => void;
}

export interface ClientToServerEvents {
  [eventName: string]: (data: unknown) => void;
}
