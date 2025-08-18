import { useEffect, useRef } from 'react';

import type {
  ServerToClientEventNames,
  ServerToClientEvents,
} from '@/lib/asyncApi/_generated/types';

import { socketClient } from '../core/client';
import { SocketEventHandler } from '../core/eventHandler';

/**
 * React 훅으로 소켓 이벤트를 구독합니다.
 * 컴포넌트 언마운트 시 자동으로 구독을 해제합니다.
 *
 * @param eventName 구독할 서버 이벤트 이름
 * @param callback 이벤트 발생 시 실행될 콜백 함수
 */
export const useSocketListener = <T extends ServerToClientEventNames>(
  eventName: T,
  callback: ServerToClientEvents[T]
) => {
  const callbackRef = useRef(callback);

  // callback이 변경될 때마다 ref 업데이트
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const socketEventHandler = new SocketEventHandler(socketClient);

    // 안정적인 콜백 함수 (재구독을 방지하기 위해)
    const stableCallback: ServerToClientEvents[ServerToClientEventNames] = (
      data
    ) => callbackRef.current(data);

    socketEventHandler.on(eventName, stableCallback);

    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      socketEventHandler.off(eventName, stableCallback);
    };
  }, [eventName]); // callback 의존성 제거로 불필요한 재구독 방지
};
