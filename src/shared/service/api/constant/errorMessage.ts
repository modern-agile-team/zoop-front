import {
  JoinGameRoomControllerJoinGameRoom404Code,
  JoinGameRoomControllerJoinGameRoom409Code,
} from '@/lib/orval/_generated/quizzesGameIoBackend.schemas';

export const ERROR_MESSAGE_MAP = {
  [JoinGameRoomControllerJoinGameRoom409Code.GAME_ROOM_MEMBERALREADY_EXISTS]:
    '이미 게임 방에 참여하고 있습니다.',
  [JoinGameRoomControllerJoinGameRoom409Code.GAME_ROOM_MEMBERCAPACITY_EXCEEDED]:
    '게임 방의 최대 인원 수를 초과하였습니다.',
  [JoinGameRoomControllerJoinGameRoom404Code.GAME_ROOMNOT_FOUND]:
    '게임 방을 찾을 수 없습니다.',
  'COMMON.REQUEST_VALIDATION_ERROR': '잘못된 요청입니다.',
} as const;
