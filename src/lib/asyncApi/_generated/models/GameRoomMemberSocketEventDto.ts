import type { GameRoomMemberRole } from './GameRoomMemberRole';
interface GameRoomMemberSocketEventDto {
  id: string;
  accountId: string;
  role: GameRoomMemberRole;
  nickname: string;
  additionalProperties?: Record<string, unknown>;
}
export type { GameRoomMemberSocketEventDto };
