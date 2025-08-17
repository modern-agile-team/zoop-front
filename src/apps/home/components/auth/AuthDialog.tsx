import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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

const authSchema = z.object({
  username: z
    .string()
    .min(1, '사용자명을 입력해주세요.')
    .min(3, '사용자명은 3자 이상이어야 합니다.')
    .trim(),
  password: z
    .string()
    .min(1, '비밀번호를 입력해주세요.')
    .min(6, '비밀번호는 6자 이상이어야 합니다.'),
});

type AuthFormData = z.infer<typeof authSchema>;

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

  const form = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const signUpMutation = useMutation(authQueries.signUp());
  const signInMutation = useMutation(authQueries.signIn());

  const isLoading = signUpMutation.isPending || signInMutation.isPending;

  const handleSubmit = async (data: AuthFormData) => {
    try {
      if (mode === 'signup') {
        const result = await signUpMutation.mutateAsync(
          data as SignUpWithUsernameDto
        );
        onSuccess?.(result.accessToken);
      } else {
        const result = await signInMutation.mutateAsync(
          data as SignInWithUsernameDto
        );
        onSuccess?.(result.accessToken);
      }
      onClose?.();
    } catch (error: unknown) {
      // Handle API errors
      const apiErrorResponse = error as {
        response?: { data?: { code?: string } };
      };
      const errorCode = apiErrorResponse?.response?.data?.code;
      if (errorCode === 'ACCOUNT.USERNAME_ALREADY_OCCUPIED') {
        form.setError('username', {
          message: '이미 사용 중인 사용자명입니다.',
        });
      } else if (errorCode === 'AUTH.SIGN_IN_INFO_NOT_MATCHED') {
        form.setError('password', {
          message: '사용자명 또는 비밀번호가 올바르지 않습니다.',
        });
      }
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    form.reset();
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

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">사용자명</Label>
            <Input
              id="username"
              type="text"
              {...form.register('username')}
              placeholder="사용자명을 입력하세요"
              disabled={isLoading}
              className={form.formState.errors.username ? 'border-red-500' : ''}
            />
            {form.formState.errors.username && (
              <p className="text-sm text-red-500">
                {form.formState.errors.username.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              {...form.register('password')}
              placeholder="비밀번호를 입력하세요"
              disabled={isLoading}
              className={form.formState.errors.password ? 'border-red-500' : ''}
            />
            {form.formState.errors.password && (
              <p className="text-sm text-red-500">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

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
