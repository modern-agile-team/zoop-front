import type { LobbyGameRoomCreatedSocketEvent } from '@/lib/asyncApi/_generated/models/LobbyGameRoomCreatedSocketEvent';
import type { GameRoomDto } from '@/lib/orval/_generated/quizzesGameIoBackend.schemas';

/**
 * 게임 방 생성 이벤트로부터 GameRoomDto 객체를 생성합니다.
 */
export const roomFromEvent = (
  event: LobbyGameRoomCreatedSocketEvent
): GameRoomDto => {
  const { body, timestamp } = event;
  const hostMember =
    body.members.find((member) => member.role === 'host') ?? body.members[0];

  return {
    createdAt: timestamp,
    id: body.gameRoomId,
    status: body.status,
    title: body.title,
    quizzesCount: body.quizzesCount,
    updatedAt: timestamp,
    currentMembersCount: body.currentMembersCount,
    hostId: hostMember.accountId,
    members: body.members.map((member) => ({
      ...member,
      createdAt: timestamp,
      updatedAt: timestamp,
      gameRoomId: body.gameRoomId,
    })),
    maxMembersCount: body.maxPlayers,
    quizTimeLimitInSeconds: body.quizTimeLimitInSeconds,
  };
};
