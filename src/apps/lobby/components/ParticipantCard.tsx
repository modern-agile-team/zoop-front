import { Crown } from 'lucide-react';

import type { AccountDto } from '@/lib/orval/_generated/quizzesGameIoBackend.schemas';

interface ParticipantCardProps {
  participant: AccountDto;
}

export default function ParticipantCard({ participant }: ParticipantCardProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-white hover:bg-gray-50 transition-colors">
      <div
        className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full flex-shrink-0 ${
          participant.isActive ? 'bg-green-500' : 'bg-gray-400'
        }`}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          {participant.role === 'host' && (
            <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 flex-shrink-0" />
          )}
          <span className="text-xs sm:text-sm font-medium text-gray-900 truncate">
            {participant.nickname}
          </span>
        </div>
      </div>
    </div>
  );
}
