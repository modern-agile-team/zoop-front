import type { AccountEnteredSocketEventBodyAccount } from './AccountEnteredSocketEventBodyAccount';
export interface AccountEnteredSocketEventBody {
  account: AccountEnteredSocketEventBodyAccount;
  currentActiveAccountsCount: number;
  additionalProperties?: Map<string, unknown>;
}
