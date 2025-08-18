const AUTH_TOKEN_KEY = 'authToken';

export const STORAGE = {
  getAuthToken: () => localStorage.getItem(AUTH_TOKEN_KEY),
  setAuthToken: (token: string) => localStorage.setItem(AUTH_TOKEN_KEY, token),
  removeAuthToken: () => localStorage.removeItem(AUTH_TOKEN_KEY),
};
