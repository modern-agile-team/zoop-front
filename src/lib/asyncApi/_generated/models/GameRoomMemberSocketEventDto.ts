import type { GameRoomMemberRole } from './GameRoomMemberRole';
interface GameRoomMemberSocketEventDto {
  accountId: string;
  role: GameRoomMemberRole;
  nickname: string;
}
export type { GameRoomMemberSocketEventDto };
