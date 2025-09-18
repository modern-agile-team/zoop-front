import type { GameRoomCreatedSocketEventAction } from './GameRoomCreatedSocketEventAction';
import type { GameRoomSocketEventDto } from './GameRoomSocketEventDto';
interface LobbyGameRoomCreatedSocketEvent {
  action: GameRoomCreatedSocketEventAction;
  eventName: string;
  timestamp: string;
  body: GameRoomSocketEventDto;
  meta: Record<string, unknown>;
}
export type { LobbyGameRoomCreatedSocketEvent };
