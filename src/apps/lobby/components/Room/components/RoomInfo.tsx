import { Users, Lock } from 'lucide-react';

interface ParticipantInfo {
  current: number;
  max: number;
}

interface RoomInfoProps {
  participantInfo: ParticipantInfo;
  isPrivate: boolean;
}

export default function RoomInfo({ participantInfo, isPrivate }: RoomInfoProps) {
  return (
    <section className="flex items-center justify-between mb-4">
      <div
        className="flex items-center gap-2 px-2 py-1 bg-gray-50 rounded-md"
        role="group"
        aria-label={`참가자 수: 현재 ${participantInfo.current}명, 최대 ${participantInfo.max}명`}
      >
        <Users className="w-4 h-4 text-gray-500" aria-hidden="true" />
        <span className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">
            {participantInfo.current}
          </span>
          <span className="text-gray-400 mx-1">/</span>
          <span className="text-gray-600">{participantInfo.max}</span>
        </span>
      </div>

      {isPrivate && (
        <div
          className="flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-600 rounded-md text-xs font-medium"
          role="note"
          aria-label="비공개 방"
        >
          <Lock className="w-3 h-3" aria-hidden="true" />
          비공개
        </div>
      )}
    </section>
  );
}
