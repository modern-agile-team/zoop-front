import {
  signInWithUsernameControllerSignInWithUsername,
  signUpWithUsernameControllerSignUpWithUsername,
} from '@/lib/orval/api/_generated/quizzesGameIoBackend';
import type {
  SignInWithUsernameDto,
  SignUpWithUsernameDto,
} from '@/lib/orval/api/_generated/quizzesGameIoBackend.schemas';

export const authQueries = {
  signUp: () => ({
    mutationFn: (data: SignUpWithUsernameDto) =>
      signUpWithUsernameControllerSignUpWithUsername(data),
    mutationKey: ['auth', 'signUp'] as const,
  }),
  signIn: () => ({
    mutationFn: (data: SignInWithUsernameDto) =>
      signInWithUsernameControllerSignInWithUsername(data),
    mutationKey: ['auth', 'signIn'] as const,
  }),
};
