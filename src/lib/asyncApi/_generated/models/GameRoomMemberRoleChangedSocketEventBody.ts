import type { GameRoomMemberRole } from './GameRoomMemberRole';
interface GameRoomMemberRoleChangedSocketEventBody {
  accountId: string;
  gameRoomId: string;
  role: GameRoomMemberRole;
  nickname: string;
}
export type { GameRoomMemberRoleChangedSocketEventBody };
