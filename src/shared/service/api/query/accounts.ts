import { queryOptions } from '@tanstack/react-query';

import {
  getAccountControllerGetMe,
  listAccountsControllerListAccounts,
} from '@/lib/orval/_generated/quizzesGameIoBackend';
import type { ListAccountsControllerListAccountsParams } from '@/lib/orval/_generated/quizzesGameIoBackend.schemas';

export const accountsQuery = {
  getList: (params: ListAccountsControllerListAccountsParams) =>
    queryOptions({
      queryKey: ['accounts', { params }] as const,
      queryFn: ({ queryKey }) =>
        listAccountsControllerListAccounts(queryKey[1].params),
    }),
  getMyInfo: () =>
    queryOptions({
      queryKey: ['accounts', 'me'] as const,
      queryFn: () => getAccountControllerGetMe(),
    }),
};
