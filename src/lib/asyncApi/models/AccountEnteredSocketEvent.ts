import type { AccountEnteredSocketEventBody } from './AccountEnteredSocketEventBody';
export interface AccountEnteredSocketEvent {
  eventName: string;
  timestamp: string;
  body: AccountEnteredSocketEventBody;
  meta: Map<string, unknown>;
  additionalProperties?: Map<string, unknown>;
}
