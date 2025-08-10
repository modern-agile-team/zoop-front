import { Button } from '@/shared/components/ui/button';
import { Gamepad2 } from 'lucide-react';
import type { HomeHeaderProps } from '../types';

export default function HomeHeader({ isLoggedIn, onLogout }: HomeHeaderProps) {
  return (
    <header className="flex items-center justify-between p-6">
      <div className="flex items-center gap-3">
        <Gamepad2 className="size-10 text-white" aria-hidden="true" />
        <span className="text-xl font-bold text-white">Quiz Battle</span>
      </div>

      {isLoggedIn && (
        <div className="flex items-center gap-3">
          <span className="text-white/80 text-sm">환영합니다!</span>
          <Button onClick={onLogout} variant="ghost" aria-label="로그아웃">
            로그아웃
          </Button>
        </div>
      )}
    </header>
  );
}
