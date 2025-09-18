import type { GameRoomMemberSocketEventDto } from './GameRoomMemberSocketEventDto';
import type { GameRoomStatus } from './GameRoomStatus';
import type { GameRoomVisibility } from './GameRoomVisibility';
interface GameRoomSocketEventDto {
  gameRoomId: string;
  reservedStatus: GameRoomStatus;
  visibility: GameRoomVisibility;
  title: string;
  maxPlayers: number;
  currentMembersCount: number;
  members: GameRoomMemberSocketEventDto[];
}
export type { GameRoomSocketEventDto };
