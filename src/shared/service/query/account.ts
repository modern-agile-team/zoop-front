import { queryOptions } from '@tanstack/react-query';

export const accountsOnlineQuery = {
  getOnlineMemberCount: () =>
    queryOptions({
      queryKey: ['accounts', 'onlineUsers'] as const,
      queryFn: () => 0,
      initialData: 0,
      staleTime: Infinity,
    }),
};
