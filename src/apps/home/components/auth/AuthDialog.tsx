import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';

import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

type AuthMode = 'login' | 'signup';

interface AuthDialogProps {
  authMode?: AuthMode;
  isOpen: boolean;
  onSuccess?: (token: string) => void;
  onClose?: () => void;
}

export function AuthDialog({
  authMode = 'login',
  isOpen,
  onSuccess,
  onClose,
}: AuthDialogProps) {
  const [mode, setMode] = useState<AuthMode>(authMode);

  const handleSuccess = (token: string) => {
    onSuccess?.(token);
    onClose?.();
  };

  const switchToLogin = () => {
    setMode('login');
  };

  const switchToSignup = () => {
    setMode('signup');
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        onClose?.();
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mode === 'login' ? '로그인' : '회원가입'}</DialogTitle>
          <DialogDescription>
            {mode === 'login'
              ? '계정에 로그인하세요.'
              : '새 계정을 만들어보세요.'}
          </DialogDescription>
        </DialogHeader>

        {mode === 'login' ? (
          <LoginForm
            onSuccess={handleSuccess}
            onSwitchToSignup={switchToSignup}
          />
        ) : (
          <SignupForm
            onSuccess={handleSuccess}
            onSwitchToLogin={switchToLogin}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
