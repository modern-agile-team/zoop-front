import type {
  ClientToServerEventData,
  ClientToServerEventNames,
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
    data: ClientToServerEventData<ClientToServerEventNames>
  ) {
    let socket = this.socketClient.getSocket();

    if (!socket) {
      socket = this.socketClient.connect();
    }

    socket.emit(event, data);
  }
}
