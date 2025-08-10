import { Button } from '@/shared/components/ui/button';
import { Users, Play, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  roomId: string;
  title: string;
  participantInfo: {
    current: number;
    max: number;
  };
  status: 'waiting' | 'playing' | 'full';
  isPrivate?: boolean;
}

export default function Room({ 
  title, 
  roomId, 
  participantInfo, 
  status = 'waiting',
  isPrivate = false
}: Props) {
  const isJoinable = status === 'waiting' && participantInfo.current < participantInfo.max;
  const statusConfig = {
    waiting: {
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      icon: Users,
      text: '입장 가능'
    },
    playing: {
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      icon: Play,
      text: '게임 중'
    },
    full: {
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      icon: Users,
      text: '인원 가득'
    }
  };

  const currentStatus = statusConfig[status];
  const StatusIcon = currentStatus.icon;

  return (
    <div className={cn(
      "group relative overflow-hidden rounded-xl border-2 transition-all duration-300 transform",
      isJoinable 
        ? "border-green-200 bg-gradient-to-br from-white to-green-50/30 hover:border-green-400 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-100/50" 
        : status === 'playing'
        ? "border-yellow-200 bg-gradient-to-br from-white to-yellow-50/30 hover:border-yellow-400 hover:-translate-y-1 hover:shadow-lg hover:shadow-yellow-100/50"
        : "border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100/30 opacity-75"
    )}>
      {/* 상태 표시 배지 */}
      <div className={cn(
        "absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm",
        currentStatus.color,
        currentStatus.bgColor
      )}>
        <StatusIcon className="w-3.5 h-3.5" />
        {currentStatus.text}
      </div>

      <div className="p-5">
        {/* 방 정보 헤더 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={cn(
              "flex items-center justify-center w-10 h-10 rounded-xl text-sm font-bold shadow-sm",
              isJoinable ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
            )}>
              {roomId}
            </div>
            {isPrivate && (
              <div className="flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-600 rounded-md text-xs font-medium">
                <Lock className="w-3 h-3" />
                비공개
              </div>
            )}
          </div>
          
          <div className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold",
            participantInfo.current >= participantInfo.max 
              ? "bg-red-100 text-red-700" 
              : "bg-blue-100 text-blue-700"
          )}>
            <Users className="w-4 h-4" />
            <span>{participantInfo.current}</span>
            <span className="text-gray-400">/</span>
            <span>{participantInfo.max}</span>
          </div>
        </div>

        {/* 방 제목 */}
        <h3 className={cn(
          "text-base font-bold mb-4 line-clamp-2 leading-tight transition-colors",
          isJoinable ? "text-gray-900 group-hover:text-blue-600" : "text-gray-600"
        )}>
          {title}
        </h3>

        {/* 참여 버튼 */}
        <Button 
          className={cn(
            "w-full h-11 font-semibold text-sm transition-all duration-300 transform",
            isJoinable 
              ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl hover:scale-[1.02]" 
              : status === 'playing'
              ? "bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white shadow-md hover:shadow-lg"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          )}
          disabled={status === 'full'}
        >
          {status === 'playing' ? '🎮 관전하기' : 
           status === 'full' ? '❌ 인원 가득' : 
           '🚀 참여하기'}
        </Button>
      </div>

      {/* 호버 효과 */}
      {isJoinable && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-green-500/5 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 rounded-xl opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-500 pointer-events-none" />
        </>
      )}
    </div>
  );
}
