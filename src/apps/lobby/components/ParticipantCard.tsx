import { Crown } from 'lucide-react';

import type { Participant } from '../types';
import { getTierIcon } from '../utils/helpers';

interface ParticipantCardProps {
  participant: Participant;
}

export default function ParticipantCard({ participant }: ParticipantCardProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-white hover:bg-gray-50 transition-colors">
      <div
        className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full flex-shrink-0 ${
          participant.status === 'online'
            ? 'bg-green-500'
            : participant.status === 'playing'
              ? 'bg-yellow-500'
              : 'bg-gray-400'
        }`}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          {participant.isHost && (
            <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 flex-shrink-0" />
          )}
          <span className="text-xs sm:text-sm font-medium text-gray-900 truncate">
            {participant.name}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <span className="text-xs">{getTierIcon(participant.tier)}</span>
          <span className="capitalize text-xs">{participant.tier}</span>
        </div>
      </div>
    </div>
  );
}
