import React from 'react';
import { useTheme } from '@/src/theme';
import { useButtonContext } from './ButtonContext';
import { getButtonTextStyles } from './ButtonStyles';
import { ActivityIndicator } from 'react-native';

/**
 * Custom hook to get button text styles based on context
 */
function useSharedButtonTextStyles() {
  const t = useTheme();
  const { color, variant, disabled, size } = useButtonContext();
  return React.useMemo(() => {
    return getButtonTextStyles(t, variant, color, size, disabled);
  }, [t, variant, color, size, disabled]);
}

/**
 * Loading component specifically styled for buttons
 */
export function ButtonLoading() {
  const textStyles = useSharedButtonTextStyles();
  return <ActivityIndicator color={textStyles?.color ?? 'white'} />;
}
