import { io, type Socket } from 'socket.io-client';

import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from '@/lib/asyncApi/types';
import { SOCKET_URL } from '@/shared/constant/env';

type TypedSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

class SocketClient {
  private socket: TypedSocket | null = null;
  private static instance: SocketClient;

  private constructor() {}

  static getInstance(): SocketClient {
    if (!SocketClient.instance) {
      SocketClient.instance = new SocketClient();
    }
    return SocketClient.instance;
  }

  connect(): TypedSocket {
    if (this.socket?.connected) {
      return this.socket;
    }

    const token = localStorage.getItem('token');

    this.socket = io(SOCKET_URL, {
      auth: {
        token: token ? `Bearer ${token}` : undefined,
      },
      transports: ['websocket'],
    });

    return this.socket;
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  getSocket(): TypedSocket | null {
    return this.socket;
  }

  // 타입 안전한 이벤트 리스너
  onAccountEntered(callback: ServerToClientEvents['account.entered']) {
    if (this.socket) {
      this.socket.on('account.entered', callback);
    }
    return this;
  }

  // 타입 안전한 이벤트 리스너 제거
  offAccountEntered(callback?: ServerToClientEvents['account.entered']) {
    if (this.socket) {
      this.socket.off('account.entered', callback);
    }
    return this;
  }
}

export const socketClient = SocketClient.getInstance();
export type { TypedSocket };
