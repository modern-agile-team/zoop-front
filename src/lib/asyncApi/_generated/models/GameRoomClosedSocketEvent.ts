import type { GameRoomClosedSocketEventBody } from './GameRoomClosedSocketEventBody';
interface GameRoomClosedSocketEvent {
  eventName: string;
  timestamp: string;
  body: GameRoomClosedSocketEventBody;
  meta: Record<string, unknown>;
}
export type { GameRoomClosedSocketEvent };
