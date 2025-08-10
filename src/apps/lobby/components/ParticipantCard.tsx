import { Crown } from 'lucide-react';
import { Participant } from '../types';
import { getTierIcon } from '../utils/helpers';

interface ParticipantCardProps {
  participant: Participant;
}

export default function ParticipantCard({ participant }: ParticipantCardProps) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-white hover:bg-gray-50 transition-colors">
      <div
        className={`w-3 h-3 rounded-full ${
          participant.status === 'online'
            ? 'bg-green-500'
            : participant.status === 'playing'
              ? 'bg-yellow-500'
              : 'bg-gray-400'
        }`}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          {participant.isHost && <Crown className="w-4 h-4 text-yellow-500" />}
          <span className="text-sm font-medium text-gray-900 truncate">
            {participant.name}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <span>{getTierIcon(participant.tier)}</span>
          <span className="capitalize">{participant.tier}</span>
        </div>
      </div>
    </div>
  );
}
