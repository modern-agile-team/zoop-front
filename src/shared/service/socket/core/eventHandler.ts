import type {
  ClientToServerEventNames,
  ClientToServerEvents,
  ServerToClientEventNames,
  ServerToClientEvents,
} from '@/lib/asyncApi/_generated/types';

import type { SocketClient } from './client';

export class SocketEventHandler {
  private socketClient: SocketClient;

  constructor(socketClient: SocketClient) {
    this.socketClient = socketClient;
  }

  on(
    event: ServerToClientEventNames,
    callback: ServerToClientEvents[ServerToClientEventNames]
  ) {
    let socket = this.socketClient.getSocket();

    if (!socket) {
      socket = this.socketClient.connect();
    }

    socket.on(event, callback);
  }

  off(
    event: ServerToClientEventNames,
    callback?: ServerToClientEvents[ServerToClientEventNames]
  ) {
    let socket = this.socketClient.getSocket();

    if (!socket) {
      socket = this.socketClient.connect();
    }

    socket.off(event, callback);
  }

  emit(
    event: ClientToServerEventNames,
    data: Parameters<ClientToServerEvents[ClientToServerEventNames]>[0]
  ) {
    let socket = this.socketClient.getSocket();

    if (!socket) {
      socket = this.socketClient.connect();
    }
    /**
     * TODO: ClientToServerEventNames가 정의되면 String을 제거하고 event로 변경
     */
    socket.emit(event, data);
  }
}
