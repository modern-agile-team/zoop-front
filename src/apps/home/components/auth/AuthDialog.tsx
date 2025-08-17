import React, { useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import type {
  SignInWithUsernameDto,
  SignUpWithUsernameDto,
} from '@/api/_generated/quizzesGameIoBackend.schemas';
import { authQueries } from '@/api/query/auth';
import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';

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
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const signUpMutation = useMutation(authQueries.signUp());
  const signInMutation = useMutation(authQueries.signIn());

  const isLoading = signUpMutation.isPending || signInMutation.isPending;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = '사용자명을 입력해주세요.';
    } else if (formData.username.length < 3) {
      newErrors.username = '사용자명은 3자 이상이어야 합니다.';
    }

    if (!formData.password.trim()) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (formData.password.length < 6) {
      newErrors.password = '비밀번호는 6자 이상이어야 합니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (mode === 'signup') {
        const result = await signUpMutation.mutateAsync(
          formData as SignUpWithUsernameDto
        );
        onSuccess?.(result.accessToken);
      } else {
        const result = await signInMutation.mutateAsync(
          formData as SignInWithUsernameDto
        );
        onSuccess?.(result.accessToken);
      }
      onClose?.();
    } catch (error: unknown) {
      // Handle API errors
      const apiError = error as {
        response?: { data?: { code?: string } };
      };
      const errorCode = apiError?.response?.data?.code;
      if (errorCode === 'ACCOUNT.USERNAME_ALREADY_OCCUPIED') {
        setErrors({ username: '이미 사용 중인 사용자명입니다.' });
      } else if (errorCode === 'AUTH.SIGN_IN_INFO_NOT_MATCHED') {
        setErrors({ password: '사용자명 또는 비밀번호가 올바르지 않습니다.' });
      } else {
        setErrors({ general: '오류가 발생했습니다. 다시 시도해주세요.' });
      }
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setErrors({});
    setFormData({ username: '', password: '' });
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">사용자명</Label>
            <Input
              id="username"
              type="text"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              placeholder="사용자명을 입력하세요"
              disabled={isLoading}
              className={errors.username ? 'border-red-500' : ''}
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder="비밀번호를 입력하세요"
              disabled={isLoading}
              className={errors.password ? 'border-red-500' : ''}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {errors.general && (
            <p className="text-sm text-red-500">{errors.general}</p>
          )}

          <div className="flex flex-col gap-2">
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading
                ? '처리 중...'
                : mode === 'login'
                  ? '로그인'
                  : '회원가입'}
            </Button>

            <Button
              type="button"
              variant="ghost"
              onClick={switchMode}
              disabled={isLoading}
              className="w-full"
            >
              {mode === 'login'
                ? '계정이 없으신가요? 회원가입'
                : '이미 계정이 있으신가요? 로그인'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
