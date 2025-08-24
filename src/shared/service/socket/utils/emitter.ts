import type {
  ClientToServerEventNames,
  ClientToServerEvents,
} from '@/lib/asyncApi/_generated/types';

import { socketClient } from '../core/client';
import { SocketEventHandler } from '../core/eventHandler';

/**
 * 소켓 이벤트를 서버로 전송합니다.
 *
 * @param eventName 전송할 이벤트 이름
 * @param data 전송할 데이터
 * @throws {Error} 소켓 전송 실패 시
 */
export const emitSocketEvent = (
  eventName: ClientToServerEventNames,
  data: Parameters<ClientToServerEvents[ClientToServerEventNames]>[0]
) => {
  try {
    const socketEventHandler = new SocketEventHandler(socketClient);
    return socketEventHandler.emit(eventName, data);
  } catch (error) {
    console.error('Socket emission failed:', error);
    throw error;
  }
};
