import { mutationOptions, queryOptions } from '@tanstack/react-query';

import {
  createGameRoomControllerCreateGameRoom,
  getGameRoomControllerGetGameRoom,
  joinGameRoomControllerJoinGameRoom,
  leaveGameRoomControllerLeaveGameRoom,
  listGameRoomsControllerListGameRooms,
} from '@/lib/orval/_generated/quizzesGameIoBackend';
import type {
  CreateGameRoomDto,
  ListGameRoomsControllerListGameRoomsParams,
} from '@/lib/orval/_generated/quizzesGameIoBackend.schemas';

export const gameRoomQuery = {
  getList: (options?: ListGameRoomsControllerListGameRoomsParams) =>
    queryOptions({
      queryKey: ['game-rooms', options ? { options } : {}] as const,
      queryFn: ({ queryKey }) =>
        listGameRoomsControllerListGameRooms(queryKey[1].options),
    }),
  getDetail: (gameRoomId: string) =>
    queryOptions({
      queryKey: ['game-room', gameRoomId] as const,
      queryFn: () => getGameRoomControllerGetGameRoom(gameRoomId),
    }),
  createRoom: mutationOptions({
    mutationFn: ({ title, quizzesCount }: CreateGameRoomDto) => {
      return createGameRoomControllerCreateGameRoom({ title, quizzesCount });
    },
  }),
  joinRoom: mutationOptions({
    mutationFn: (roomId: string) => joinGameRoomControllerJoinGameRoom(roomId),
  }),
  exitRoom: mutationOptions({
    mutationFn: (roomId: string) =>
      leaveGameRoomControllerLeaveGameRoom(roomId),
    mutationKey: ['game-rooms', 'delete'],
  }),
};
