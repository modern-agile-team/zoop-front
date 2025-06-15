import { useQuery, useQueryClient } from '@tanstack/react-query';

const STORAGE_KEY = 'authToken';
const AUTH_QUERY_KEY = ['authToken'];

export default function useAuth() {
  const queryClient = useQueryClient();

  // 최초 로딩 시 localStorage에서 토큰 읽기
  const { data: isLoggedIn } = useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: () => {
      if (typeof window === 'undefined') return false;
      const token = localStorage.getItem(STORAGE_KEY);
      return token;
    },
    select: (token) => {
      return !!token; // 토큰이 있으면 true, 없으면 false
    },
    staleTime: Infinity,
    initialData: undefined,
  });

  const login = (token: string) => {
    localStorage.setItem(STORAGE_KEY, token);
    queryClient.setQueryData(AUTH_QUERY_KEY, token);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    queryClient.setQueryData(AUTH_QUERY_KEY, null);
  };

  return { isLoggedIn, login, logout };
}
