import type { GameRoomMemberRole } from './GameRoomMemberRole';
interface GameRoomMemberJoinedSocketEventBody {
  accountId: string;
  gameRoomId: string;
  role: GameRoomMemberRole;
  currentMembersCount: number;
}
export type { GameRoomMemberJoinedSocketEventBody };
