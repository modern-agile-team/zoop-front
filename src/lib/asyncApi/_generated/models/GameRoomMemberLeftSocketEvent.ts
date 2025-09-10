import type { GameRoomMemberLeftSocketEventBody } from './GameRoomMemberLeftSocketEventBody';
interface GameRoomMemberLeftSocketEvent {
  eventName: string;
  timestamp: string;
  body: GameRoomMemberLeftSocketEventBody;
  meta: Record<string, unknown>;
}
export type { GameRoomMemberLeftSocketEvent };
