import type { AccountChangedSocketEventAction } from './AccountChangedSocketEventAction';
import type { AccountSocketEventDto } from './AccountSocketEventDto';
interface LobbyAccountChangedSocketEvent {
  action: AccountChangedSocketEventAction;
  eventName: string;
  timestamp: string;
  body: AccountSocketEventDto;
  meta: Record<string, unknown>;
}
export type { LobbyAccountChangedSocketEvent };
