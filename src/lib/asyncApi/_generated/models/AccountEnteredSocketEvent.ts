import type { AccountEnteredSocketEventBody } from './AccountEnteredSocketEventBody';
interface AccountEnteredSocketEvent {
  eventName: string;
  timestamp: string;
  body: AccountEnteredSocketEventBody;
  meta: Record<string, unknown>;
}
export type { AccountEnteredSocketEvent };
