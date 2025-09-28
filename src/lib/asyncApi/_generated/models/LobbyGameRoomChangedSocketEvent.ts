import type { GameRoomChangedSocketEventAction } from './GameRoomChangedSocketEventAction';
import type { GameRoomSocketEventDto } from './GameRoomSocketEventDto';
interface LobbyGameRoomChangedSocketEvent {
  action: GameRoomChangedSocketEventAction;
  eventName: string;
  timestamp: string;
  body: GameRoomSocketEventDto;
  meta: Record<string, unknown>;
  additionalProperties?: Record<string, unknown>;
}
export type { LobbyGameRoomChangedSocketEvent };
