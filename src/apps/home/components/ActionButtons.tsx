import { Button } from '@/shared/components/ui/button';
import { ArrowRight, LogIn, UserPlus } from 'lucide-react';

interface ActionButtonsProps {
  isLoggedIn: boolean;
  onLogin: (username: string) => void;
  onNavigateToLobby: () => void;
}

export default function ActionButtons({
  isLoggedIn,
  onLogin,
  onNavigateToLobby,
}: ActionButtonsProps) {
  return (
    <div className="space-y-6">
      {isLoggedIn ? (
        <div className="space-y-4">
          <Button
            onClick={onNavigateToLobby}
            size="lg"
            className="w-full max-w-md h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-2xl transform hover:scale-105 transition-all duration-300"
            aria-label="게임 로비로 이동"
          >
            <ArrowRight className="size-20 mr-8" aria-hidden="true" />
            로비로 이동하기
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <Button
            onClick={() => onLogin('test')}
            size="lg"
            className="w-full max-w-md h-14 text-lg font-semibold bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0 shadow-2xl transform hover:scale-105 transition-all duration-300"
            aria-label="로그인하여 게임 시작"
          >
            <LogIn className="size-20 mr-8" aria-hidden="true" />
            로그인하기
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="w-full max-w-md h-14 text-lg font-semibold text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
            aria-label="새 계정 만들기"
          >
            <UserPlus className="size-20 mr-8" aria-hidden="true" />
            회원가입
          </Button>
        </div>
      )}
    </div>
  );
}
