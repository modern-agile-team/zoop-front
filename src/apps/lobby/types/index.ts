export type RoomStatus = 'waiting' | 'playing' | 'full';
export type UserStatus = 'online' | 'playing' | 'away';
export type UserTier = 'platinum' | 'gold' | 'silver' | 'bronze';

export interface RoomInfo {
  roomId: string;
  title: string;
  participantInfo: {
    current: number;
    max: number;
  };
  status: RoomStatus;
  isPrivate?: boolean;
}

export interface Participant {
  id: string;
  name: string;
  status: UserStatus;
  isHost?: boolean;
  tier: UserTier;
}

export interface Announcement {
  id: number;
  title: string;
  date: string;
  content: string;
}
