import type { ActiveAccountChangedSocketEventAction } from './ActiveAccountChangedSocketEventAction';
import type { ActiveAccountSocketEventDto } from './ActiveAccountSocketEventDto';
interface LobbyActiveAccountChangedSocketEvent {
  action: ActiveAccountChangedSocketEventAction;
  eventName: string;
  timestamp: string;
  body: ActiveAccountSocketEventDto;
  meta: Record<string, unknown>;
  additionalProperties?: Record<string, unknown>;
}
export type { LobbyActiveAccountChangedSocketEvent };
