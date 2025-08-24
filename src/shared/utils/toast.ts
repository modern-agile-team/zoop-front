import type { ToastOptions, Id } from 'react-toastify';
import { toast as toastifyToast } from 'react-toastify';

// 기본 토스트 옵션 설정
const defaultOptions: ToastOptions = {
  position: 'top-center',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

// 각 타입별 스타일과 옵션
const toastTypeOptions = {
  success: {
    ...defaultOptions,
    type: 'success' as const,
  },
  error: {
    ...defaultOptions,
    type: 'error' as const,
    autoClose: 5000, // 에러 메시지는 조금 더 길게
  },
  info: {
    ...defaultOptions,
    type: 'info' as const,
  },
};

interface ToastInterface {
  success: (message: string, options?: Partial<ToastOptions>) => Id;
  error: (message: string, options?: Partial<ToastOptions>) => Id;
  info: (message: string, options?: Partial<ToastOptions>) => Id;
  dismiss: (toastId?: Id) => void;
  dismissAll: () => void;
}

export const toast: ToastInterface = {
  success: (message: string, options?: Partial<ToastOptions>) => {
    return toastifyToast.success(message, {
      ...toastTypeOptions.success,
      ...options,
    });
  },

  error: (message: string, options?: Partial<ToastOptions>) => {
    return toastifyToast.error(message, {
      ...toastTypeOptions.error,
      ...options,
    });
  },

  info: (message: string, options?: Partial<ToastOptions>) => {
    return toastifyToast.info(message, {
      ...toastTypeOptions.info,
      ...options,
    });
  },

  dismiss: (toastId?: Id) => {
    if (toastId) {
      toastifyToast.dismiss(toastId);
    } else {
      toastifyToast.dismiss();
    }
  },

  dismissAll: () => {
    toastifyToast.dismiss();
  },
};
