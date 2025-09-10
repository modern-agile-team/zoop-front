import type { GameRoomMemberRoleChangedSocketEventBody } from './GameRoomMemberRoleChangedSocketEventBody';
interface GameRoomMemberRoleChangedSocketEvent {
  eventName: string;
  timestamp: string;
  body: GameRoomMemberRoleChangedSocketEventBody;
  meta: Record<string, unknown>;
}
export type { GameRoomMemberRoleChangedSocketEvent };
