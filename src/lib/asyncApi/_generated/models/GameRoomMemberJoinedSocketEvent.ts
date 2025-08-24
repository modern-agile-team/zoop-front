import type { GameRoomMemberJoinedSocketEventBody } from './GameRoomMemberJoinedSocketEventBody';
interface GameRoomMemberJoinedSocketEvent {
  eventName: string;
  timestamp: string;
  body: GameRoomMemberJoinedSocketEventBody;
  meta: Record<string, unknown>;
}
export type { GameRoomMemberJoinedSocketEvent };
