import { overlay } from 'overlay-kit';

import { AuthDialog } from './AuthDialog';

type AuthMode = 'login' | 'signup';

const openAuthDialog = (options?: {
  authMode?: AuthMode;
  onSuccess?: (token: string) => void;
}) => {
  return overlay.openAsync<string | null>(({ close, isOpen }) => (
    <AuthDialog
      isOpen={isOpen}
      authMode={options?.authMode}
      onSuccess={(token) => {
        options?.onSuccess?.(token);
        close(token);
      }}
      onClose={() => {
        close(null);
      }}
    />
  ));
};

export const openLoginDialog = (onSuccess?: (token: string) => void) => {
  return openAuthDialog({ authMode: 'login', onSuccess });
};

export const openSignupDialog = (onSuccess?: (token: string) => void) => {
  return openAuthDialog({ authMode: 'signup', onSuccess });
};
