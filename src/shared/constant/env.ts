// 환경 변수 설정
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
export const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || 'http://localhost:8080';
export const APP_ENV = import.meta.env.VITE_APP_ENV || 'dev';

// 환경 변수 검증
const requiredEnvVars = {
  VITE_API_URL: API_URL,
  VITE_SOCKET_URL: SOCKET_URL,
  VITE_APP_ENV: APP_ENV,
} as const;

// 개발 모드에서만 환경 변수 검증
if (import.meta.env.DEV) {
  const missingVars = Object.entries(requiredEnvVars).filter(
    ([_key, value]) => !value || value.includes('undefined')
  );

  if (missingVars.length > 0) {
    console.warn(
      '⚠️ 누락된 환경 변수가 있습니다:',
      missingVars.map(([key]) => key).join(', ')
    );
  }
}
