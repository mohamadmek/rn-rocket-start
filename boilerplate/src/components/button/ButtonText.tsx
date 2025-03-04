import React from 'react';
import { Text } from '../text/Text';
import { atoms as a, useTheme } from '@/src/theme';
import { ButtonTextProps } from './Button.types';
import { useButtonContext } from './ButtonContext';
import { getButtonTextStyles } from './ButtonStyles';

/**
 * Custom hook to get button text styles based on context
 */
export function useSharedButtonTextStyles() {
  const t = useTheme();
  const { color, variant, disabled, size } = useButtonContext();

  return React.useMemo(() => {
    return getButtonTextStyles(t, variant, color, size, disabled);
  }, [t, variant, color, size, disabled]);
}

/**
 * Text component specifically styled for buttons
 */
export function ButtonText({ children, style, ...rest }: ButtonTextProps) {
  const textStyles = useSharedButtonTextStyles();

  return (
    <Text {...rest} style={[a.font_bold, a.text_center, textStyles, style]}>
      {children}
    </Text>
  );
}
