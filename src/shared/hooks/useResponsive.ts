import { useState, useEffect } from 'react';

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

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      
      setWindowSize({ width: newWidth, height: newHeight });
      setDeviceType(getDeviceType(newWidth));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';
  const isDesktop = deviceType === 'desktop';
  const isMobileOrTablet = isMobile || isTablet;

  return {
    deviceType,
    windowSize,
    isMobile,
    isTablet,
    isDesktop,
    isMobileOrTablet,
    breakpoints: BREAKPOINTS,
  };
}

/**
 * 특정 브레이크포인트 조건을 확인하는 훅
 */
export function useBreakpoint(breakpoint: BreakpointKey | BreakpointKey[]) {
  const { deviceType } = useResponsive();
  
  if (Array.isArray(breakpoint)) {
    return breakpoint.includes(deviceType as BreakpointKey);
  }
  
  return deviceType === breakpoint;
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
  
  switch (deviceType) {
    case 'mobile':
      return values.mobile ?? values.desktop;
    case 'tablet':
      return values.tablet ?? values.desktop;
    case 'desktop':
    default:
      return values.desktop;
  }
}

function getDeviceType(width: number): DeviceType {
  if (width <= BREAKPOINTS.mobile.max) return 'mobile';
  if (width <= BREAKPOINTS.tablet.max) return 'tablet';
  return 'desktop';
}
