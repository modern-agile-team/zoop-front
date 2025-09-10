import type { GameRoomMemberRole } from './GameRoomMemberRole';
interface GameRoomMemberLeftSocketEventBody {
  accountId: string;
  gameRoomId: string;
  role: GameRoomMemberRole;
  nickname: string;
  currentMembersCount: number;
}
export type { GameRoomMemberLeftSocketEventBody };
