import type { GameRoomDeletedSocketEventAction } from './GameRoomDeletedSocketEventAction';
import type { GameRoomIdentifierSocketEventDto } from './GameRoomIdentifierSocketEventDto';
interface LobbyGameRoomDeletedSocketEvent {
  action: GameRoomDeletedSocketEventAction;
  eventName: string;
  timestamp: string;
  body: GameRoomIdentifierSocketEventDto;
  meta: Record<string, unknown>;
}
export type { LobbyGameRoomDeletedSocketEvent };
