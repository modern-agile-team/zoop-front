import type { ERROR_MESSAGE_MAP } from '../constant/errorMessage';

// API 에러 응답 타입
export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  code: keyof typeof ERROR_MESSAGE_MAP; // enum 값
}

// 커스텀 API 에러 클래스
export class ApiError extends Error {
  statusCode: number;
  code: keyof typeof ERROR_MESSAGE_MAP;

  constructor({ statusCode, message, code }: ApiErrorResponse) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = code;
  }
}

// 에러 응답을 ApiError로 변환하는 유틸리티
export function parseApiError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error;
  }
  throw new ApiError({
    statusCode: 400,
    message: 'Unknown error',
    code: 'COMMON.REQUEST_VALIDATION_ERROR',
  });
}
