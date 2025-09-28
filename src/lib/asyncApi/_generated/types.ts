// Auto-generated Socket event types

import type { GameRoomChangedSocketEvent } from './models/GameRoomChangedSocketEvent';
import type { LobbyAccountChangedSocketEvent } from './models/LobbyAccountChangedSocketEvent';
import type { LobbyActiveAccountChangedSocketEvent } from './models/LobbyActiveAccountChangedSocketEvent';
import type { LobbyGameRoomChangedSocketEvent } from './models/LobbyGameRoomChangedSocketEvent';
import type { LobbyGameRoomCreatedSocketEvent } from './models/LobbyGameRoomCreatedSocketEvent';
import type { LobbyGameRoomDeletedSocketEvent } from './models/LobbyGameRoomDeletedSocketEvent';

export const enum ServerToClientEventNames {
  LOBBY_GAME_ROOM_CREATED = 'lobby.game_room.created',
  LOBBY_GAME_ROOM_CHANGED = 'lobby.game_room.changed',
  LOBBY_GAME_ROOM_DELETED = 'lobby.game_room.deleted',
  GAME_ROOM_GAME_ROOM_CHANGED = 'game_room.game_room.changed',
  LOBBY_ACCOUNT_CHANGED = 'lobby.account.changed',
  LOBBY_ACTIVE_ACCOUNT_CHANGED = 'lobby.active_account.changed',
}

export const enum ClientToServerEventNames {
  // 현재 클라이언트에서 서버로 보내는 이벤트가 정의되지 않았습니다
  // AsyncAPI 스펙에서 subscribe 이벤트를 추가하면 여기에 자동으로 생성됩니다
  DUMMY_EVENT = 'dummy_event',
}

// 유틸리티 타입들
export type ServerToClientEventData<T extends ServerToClientEventNames> =
  Parameters<ServerToClientEvents[T]>[0];

export type ClientToServerEventData<T extends ClientToServerEventNames> =
  Parameters<ClientToServerEvents[T]>[0];

// Socket.io 이벤트 맵 정의
export interface ServerToClientEvents {
  /** 게임방이 생성됨 */
  [ServerToClientEventNames.LOBBY_GAME_ROOM_CREATED]: (
    data: LobbyGameRoomCreatedSocketEvent
  ) => void;
  /** 게임방의 상태 변경 */
  [ServerToClientEventNames.LOBBY_GAME_ROOM_CHANGED]: (
    data: LobbyGameRoomChangedSocketEvent
  ) => void;
  /** 게임방이 폐쇄됨 */
  [ServerToClientEventNames.LOBBY_GAME_ROOM_DELETED]: (
    data: LobbyGameRoomDeletedSocketEvent
  ) => void;
  /** 게임방의 상태 변경 */
  [ServerToClientEventNames.GAME_ROOM_GAME_ROOM_CHANGED]: (
    data: GameRoomChangedSocketEvent
  ) => void;
  /** 유저가 서비스에 접속 */
  [ServerToClientEventNames.LOBBY_ACCOUNT_CHANGED]: (
    data: LobbyAccountChangedSocketEvent
  ) => void;
  /** 유저가 서비스에 접속 */
  [ServerToClientEventNames.LOBBY_ACTIVE_ACCOUNT_CHANGED]: (
    data: LobbyActiveAccountChangedSocketEvent
  ) => void;
}

export interface ClientToServerEvents {
  [eventName: string]: (data: unknown) => void;
}
