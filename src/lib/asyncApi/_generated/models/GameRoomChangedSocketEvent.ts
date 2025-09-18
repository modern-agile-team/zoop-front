import type { GameRoomChangedSocketEventAction } from './GameRoomChangedSocketEventAction';
import type { GameRoomSocketEventDto } from './GameRoomSocketEventDto';
interface GameRoomChangedSocketEvent {
  action: GameRoomChangedSocketEventAction;
  eventName: string;
  timestamp: string;
  body: GameRoomSocketEventDto;
  meta: Record<string, unknown>;
}
export type { GameRoomChangedSocketEvent };
