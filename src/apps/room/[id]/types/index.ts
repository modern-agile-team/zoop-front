export type GameRoomStatus = 'waiting' | 'ready' | 'playing' | 'finished';
export type UserTier = 'platinum' | 'gold' | 'silver' | 'bronze';

export interface GameRoomPlayer {
  id: string;
  name: string;
  isHost: boolean;
  tier: UserTier;
}

export interface GameRoom {
  id: string;
  name: string;
  status: GameRoomStatus;
  players: GameRoomPlayer[];
  maxPlayers: number;
  currentRound?: number;
  totalRounds?: number;
}

export interface GameSettings {
  totalRounds: number;
  timePerQuestion: number;
  pointsPerCorrectAnswer: number;
}
