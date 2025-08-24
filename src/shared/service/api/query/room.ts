import { mutationOptions } from '@tanstack/react-query';

import { createGameRoomControllerCreateGameRoom } from '@/lib/orval/_generated/quizzesGameIoBackend';

export const gameRoomQuery = {
  createRoom: mutationOptions({
    mutationFn: ({ title }: { title: string }) => {
      return createGameRoomControllerCreateGameRoom({ title });
    },
  }),
};
