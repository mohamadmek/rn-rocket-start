import '@expo/match-media';
import { useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';

export type Breakpoint = 'gtPhone' | 'gtMobile' | 'gtTablet';

export function useBreakpoints(): Record<Breakpoint, boolean> & {
  activeBreakpoint: Breakpoint | undefined;
} {
  const gtPhone = useMediaQuery({ query: '(min-device-width: 500px)' }); // render mini ipad UI
  const gtMobile = useMediaQuery({ query: '(min-device-width: 800px)' }); // render tablet UI
  const gtTablet = useMediaQuery({ query: '(min-device-width: 1300px)' });

  return useMemo(() => {
    let active: Breakpoint | undefined;
    if (gtTablet) {
      active = 'gtTablet';
    } else if (gtMobile) {
      active = 'gtMobile';
    } else if (gtPhone) {
      active = 'gtPhone';
    }
    return {
      activeBreakpoint: active,
      gtPhone,
      gtMobile,
      gtTablet,
    };
  }, [gtPhone, gtMobile, gtTablet]);
}
