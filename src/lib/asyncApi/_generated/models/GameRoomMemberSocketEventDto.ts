import type { GameRoomMemberRole } from './GameRoomMemberRole';
interface GameRoomMemberSocketEventDto {
  accountId: string;
  role: GameRoomMemberRole;
  nickname: string;
  additionalProperties?: Record<string, unknown>;
}
export type { GameRoomMemberSocketEventDto };
