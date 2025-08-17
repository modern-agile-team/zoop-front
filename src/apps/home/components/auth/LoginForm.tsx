import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import type { SignInWithUsernameDto } from '@/api/_generated/quizzesGameIoBackend.schemas';
import { authQueries } from '@/api/query/auth';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';

import type { AuthFormData } from './schemas';
import { authSchema } from './schemas';

interface LoginFormProps {
  onSuccess?: (token: string) => void;
  onSwitchToSignup?: () => void;
}

export function LoginForm({ onSuccess, onSwitchToSignup }: LoginFormProps) {
  const form = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const signInMutation = useMutation(authQueries.signIn());

  const isLoading = signInMutation.isPending;

  const handleSubmit = async (data: AuthFormData) => {
    try {
      const result = await signInMutation.mutateAsync(
        data as SignInWithUsernameDto
      );
      onSuccess?.(result.accessToken);
    } catch (error: unknown) {
      // Handle API errors
      const apiErrorResponse = error as {
        response?: { data?: { code?: string } };
      };
      const errorCode = apiErrorResponse?.response?.data?.code;
      if (errorCode === 'AUTH.SIGN_IN_INFO_NOT_MATCHED') {
        form.setError('password', {
          message: '사용자명 또는 비밀번호가 올바르지 않습니다.',
        });
      } else {
        form.setError('root', {
          message: '로그인 중 오류가 발생했습니다. 다시 시도해주세요.',
        });
      }
    }
  };

  return (
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

      {form.formState.errors.root && (
        <p className="text-sm text-red-500">
          {form.formState.errors.root.message}
        </p>
      )}

      <div className="flex flex-col gap-2">
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? '로그인 중...' : '로그인'}
        </Button>

        <Button
          type="button"
          variant="ghost"
          onClick={onSwitchToSignup}
          disabled={isLoading}
          className="w-full"
        >
          계정이 없으신가요? 회원가입
        </Button>
      </div>
    </form>
  );
}
