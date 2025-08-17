import {
  signUpWithUsernameControllerSignUpWithUsername,
  signInWithUsernameControllerSignInWithUsername,
} from '../_generated/quizzesGameIoBackend';
import type {
  SignUpWithUsernameDto,
  SignInWithUsernameDto,
} from '../_generated/quizzesGameIoBackend.schemas';

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
