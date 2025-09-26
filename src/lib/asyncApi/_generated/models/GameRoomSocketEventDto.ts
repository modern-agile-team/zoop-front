import type { GameRoomMemberSocketEventDto } from './GameRoomMemberSocketEventDto';
import type { GameRoomStatus } from './GameRoomStatus';
import type { GameRoomVisibility } from './GameRoomVisibility';
interface GameRoomSocketEventDto {
  gameRoomId: string;
  status: GameRoomStatus;
  visibility: GameRoomVisibility;
  title: string;
  maxPlayers: number;
  currentMembersCount: number;
  quizTimeLimitInSeconds: number;
  members: GameRoomMemberSocketEventDto[];
  quizzesCount: number;
  additionalProperties?: Record<string, unknown>;
}
export type { GameRoomSocketEventDto };
