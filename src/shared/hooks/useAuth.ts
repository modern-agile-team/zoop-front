import { useQuery, useQueryClient } from '@tanstack/react-query';

import { STORAGE } from '../utils/storage';

const AUTH_QUERY_KEY = ['authToken'];

export default function useAuth() {
  const queryClient = useQueryClient();

  // 최초 로딩 시 localStorage에서 토큰 읽기
  const { data: isLoggedIn } = useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: () => {
      if (typeof window === 'undefined') return false;
      const token = STORAGE.getAuthToken();
      return token;
    },
    select: (token) => {
      return !!token; // 토큰이 있으면 true, 없으면 false
    },
    staleTime: Infinity,
    initialData: undefined,
  });

  const login = (token: string) => {
    STORAGE.setAuthToken(token);
    queryClient.setQueryData(AUTH_QUERY_KEY, token);
  };

  const logout = () => {
    STORAGE.removeAuthToken();
    queryClient.setQueryData(AUTH_QUERY_KEY, null);
  };

  return { isLoggedIn, login, logout };
}
