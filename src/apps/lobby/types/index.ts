export type UserStatus = 'online' | 'playing' | 'away';
export type UserTier = 'platinum' | 'gold' | 'silver' | 'bronze';

export interface Participant {
  id: string;
  name: string;
  status: UserStatus;
  isHost?: boolean;
  tier: UserTier;
}
