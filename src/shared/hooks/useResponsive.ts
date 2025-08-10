import { debounce } from 'es-toolkit';
import { useState, useEffect, useMemo } from 'react';

export type BreakpointKey = 'mobile' | 'tablet' | 'desktop';
export type DeviceType = 'mobile' | 'tablet' | 'desktop';

interface BreakpointConfig {
  mobile: { min: 0; max: 767 };
  tablet: { min: 768; max: 1023 };
  desktop: { min: 1024; max: number };
}

const BREAKPOINTS: BreakpointConfig = {
  mobile: { min: 0, max: 767 },
  tablet: { min: 768, max: 1023 },
  desktop: { min: 1024, max: Number.MAX_SAFE_INTEGER },
};

/**
 * 현재 화면 크기에 따른 디바이스 타입을 반환하는 훅
 */
export function useResponsive() {
  const [deviceType, setDeviceType] = useState<DeviceType>(() => {
    if (typeof window === 'undefined') return 'desktop';
    return getDeviceType(window.innerWidth);
  });

  const [windowSize, setWindowSize] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  }));

  // 디바운스된 resize 핸들러를 메모이제이션
  const debouncedHandleResize = useMemo(
    () =>
      debounce(() => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;
        const newDeviceType = getDeviceType(newWidth);

        // 디바이스 타입이 변경된 경우에만 업데이트
        setDeviceType((prevDeviceType) => {
          if (prevDeviceType !== newDeviceType) {
            return newDeviceType;
          }
          return prevDeviceType;
        });

        // 윈도우 사이즈는 항상 업데이트 (하지만 디바운스됨)
        setWindowSize({ width: newWidth, height: newHeight });
      }, 150),
    []
  );

  useEffect(() => {
    window.addEventListener('resize', debouncedHandleResize);
    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, [debouncedHandleResize]);

  // 반환 객체를 메모이제이션하여 불필요한 리렌더링 방지
  return useMemo(
    () => ({
      deviceType,
      windowSize,
      isMobile: deviceType === 'mobile',
      isTablet: deviceType === 'tablet',
      isDesktop: deviceType === 'desktop',
      isMobileOrTablet: deviceType === 'mobile' || deviceType === 'tablet',
      breakpoints: BREAKPOINTS,
    }),
    [deviceType, windowSize]
  );
}

/**
 * 특정 브레이크포인트 조건을 확인하는 훅
 */
export function useBreakpoint(breakpoint: BreakpointKey | BreakpointKey[]) {
  const { deviceType } = useResponsive();

  return useMemo(() => {
    if (Array.isArray(breakpoint)) {
      return breakpoint.includes(deviceType as BreakpointKey);
    }
    return deviceType === breakpoint;
  }, [deviceType, breakpoint]);
}

/**
 * 브레이크포인트별 값을 반환하는 훅
 */
export function useResponsiveValue<T>(values: {
  mobile?: T;
  tablet?: T;
  desktop: T;
}): T {
  const { deviceType } = useResponsive();

  return useMemo(() => {
    switch (deviceType) {
      case 'mobile':
        return values.mobile ?? values.desktop;
      case 'tablet':
        return values.tablet ?? values.desktop;
      case 'desktop':
      default:
        return values.desktop;
    }
  }, [deviceType, values]);
}

function getDeviceType(width: number): DeviceType {
  if (width <= BREAKPOINTS.mobile.max) return 'mobile';
  if (width <= BREAKPOINTS.tablet.max) return 'tablet';
  return 'desktop';
}
