import type { GameRoomStatus } from './GameRoomStatus';
import type { GameRoomVisibility } from './GameRoomVisibility';
interface GameRoomCreatedSocketEventBody {
  gameRoomId: string;
  reservedStatus: GameRoomStatus;
  visibility: GameRoomVisibility;
  title: string;
  maxPlayers: number;
  currentMembersCount: number;
}
export type { GameRoomCreatedSocketEventBody };
