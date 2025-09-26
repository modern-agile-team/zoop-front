import { mutationOptions, queryOptions } from '@tanstack/react-query';

import {
  createGameRoomControllerCreateGameRoom,
  joinGameRoomControllerJoinGameRoom,
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
  createRoom: mutationOptions({
    mutationFn: ({ title, quizzesCount }: CreateGameRoomDto) => {
      return createGameRoomControllerCreateGameRoom({ title, quizzesCount });
    },
  }),
  joinRoom: mutationOptions({
    mutationFn: (roomId: string) => joinGameRoomControllerJoinGameRoom(roomId),
  }),
};
