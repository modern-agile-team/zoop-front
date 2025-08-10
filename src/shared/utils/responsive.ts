import type { DeviceType } from '@/shared/hooks/useResponsive';

/**
 * 디바이스 타입에 따른 스타일 클래스를 반환하는 유틸리티
 */
export function getResponsiveClasses<T extends string>(
  deviceType: DeviceType,
  classes: {
    mobile?: T;
    tablet?: T;
    desktop: T;
  }
): T {
  switch (deviceType) {
    case 'mobile':
      return classes.mobile ?? classes.desktop;
    case 'tablet':
      return classes.tablet ?? classes.desktop;
    case 'desktop':
    default:
      return classes.desktop;
  }
}

/**
 * 반응형 사이즈 값을 반환하는 유틸리티
 */
export function getResponsiveSize(
  deviceType: DeviceType,
  sizes: {
    mobile?: number;
    tablet?: number;
    desktop: number;
  }
): number {
  switch (deviceType) {
    case 'mobile':
      return sizes.mobile ?? sizes.desktop;
    case 'tablet':
      return sizes.tablet ?? sizes.desktop;
    case 'desktop':
    default:
      return sizes.desktop;
  }
}

/**
 * 반응형 패딩 클래스
 */
export const RESPONSIVE_PADDING = {
  mobile: 'p-2 sm:p-3',
  tablet: 'p-3 sm:p-4',
  desktop: 'p-4 lg:p-6',
} as const;

/**
 * 반응형 텍스트 크기 클래스
 */
export const RESPONSIVE_TEXT_SIZE = {
  small: {
    mobile: 'text-xs',
    tablet: 'text-xs sm:text-sm',
    desktop: 'text-sm',
  },
  medium: {
    mobile: 'text-sm',
    tablet: 'text-sm sm:text-base',
    desktop: 'text-base',
  },
  large: {
    mobile: 'text-base',
    tablet: 'text-base sm:text-lg',
    desktop: 'text-lg',
  },
  xlarge: {
    mobile: 'text-lg',
    tablet: 'text-lg sm:text-xl',
    desktop: 'text-xl lg:text-2xl',
  },
} as const;

/**
 * 반응형 간격 클래스
 */
export const RESPONSIVE_GAP = {
  small: {
    mobile: 'gap-2',
    tablet: 'gap-2 sm:gap-3',
    desktop: 'gap-3',
  },
  medium: {
    mobile: 'gap-3',
    tablet: 'gap-3 sm:gap-4',
    desktop: 'gap-4',
  },
  large: {
    mobile: 'gap-4',
    tablet: 'gap-4 sm:gap-6',
    desktop: 'gap-6',
  },
} as const;
