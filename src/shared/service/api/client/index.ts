import ky, { HTTPError } from 'ky';

import { API_URL } from '@/shared/constant/env';
import { STORAGE } from '@/shared/utils/storage';

export const connectApi = ky.create({
  prefixUrl: API_URL,
  headers: {
    'Accept-Language': 'ko-KR',
  },
  retry: { limit: 0 },
  hooks: {
    beforeRequest: [
      (request) => {
        const token = STORAGE.getAuthToken();
        request.headers.set('Authorization', `Bearer ${token}`);
      },
    ],
    afterResponse: [
      async (_, _1, response) => {
        const json = await response.clone().json();

        return json;
      },
    ],
  },
});

export const orvalInstance = async <T>({
  url,
  method,
  headers,
  data,
}: {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  params?: Record<string, string | number | boolean | unknown>;
  headers?:
    | NonNullable<RequestInit['headers']>
    | Record<string, string | undefined>;
  data?: unknown;
}) => {
  const [, ...rawUrl] = url.split('/');

  try {
    const response = await connectApi(rawUrl.join('/'), {
      method,
      json: data,
      hooks: {
        beforeRequest: [
          (request) => {
            Object.entries(headers ?? {})
              .filter(([, value]) => value !== undefined)
              .forEach(([key, value]) =>
                request.headers.set(key, value as string)
              );
          },
        ],
      },
    });

    return response.json<T>();
  } catch (error: unknown) {
    if (!(error instanceof HTTPError)) {
      throw error;
    }

    const status = error.response.status;
    const body = await error.response.json();

    throw new Error(`HTTP Error ${status}: ${body}`);
  }
};
