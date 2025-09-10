import type { GameRoomCreatedSocketEventBody } from './GameRoomCreatedSocketEventBody';
interface GameRoomCreatedSocketEvent {
  eventName: string;
  timestamp: string;
  body: GameRoomCreatedSocketEventBody;
  meta: Record<string, unknown>;
}
export type { GameRoomCreatedSocketEvent };
