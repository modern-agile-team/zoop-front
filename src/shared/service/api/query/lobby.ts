import { queryOptions } from '@tanstack/react-query';

import { listAccountsControllerListAccounts } from '@/lib/orval/_generated/quizzesGameIoBackend';
import type { ListAccountsControllerListAccountsParams } from '@/lib/orval/_generated/quizzesGameIoBackend.schemas';

export const lobbyQuery = {
  getList: (params: ListAccountsControllerListAccountsParams) =>
    queryOptions({
      queryKey: ['accounts', { params }] as const,
      queryFn: ({ queryKey }) =>
        listAccountsControllerListAccounts(queryKey[1].params),
    }),
};
