import React from 'react';
import { View, Pressable } from 'react-native';
import { atoms as a, flatten, useTheme } from '@/src/theme';

import {
  ButtonProps,
  TButtonContext as ButtonContextType,
} from './Button.types';
import { ButtonContext } from './ButtonContext';
import { getButtonStyles } from './ButtonStyles';
import { useButtonState } from './useButtonState';
import { ButtonText } from './ButtonText';
import { ButtonLoading } from './ButtonLoading';

/**
 * Button component that supports various variants, colors, sizes, and shapes
 */
export const Button = React.forwardRef<View, ButtonProps>(
  (
    {
      children,
      variant = 'solid',
      color = 'primary',
      size,
      shape = 'default',
      label,
      disabled = false,
      style,
      hoverStyle: hoverStyleProp,
      PressableComponent = Pressable,
      isLoading,
      onPressIn: onPressInOuter,
      onPressOut: onPressOutOuter,
      onHoverIn: onHoverInOuter,
      onHoverOut: onHoverOutOuter,
      onFocus: onFocusOuter,
      onBlur: onBlurOuter,
      ...rest
    },
    ref,
  ) => {
    const t = useTheme();

    // Handle button state changes
    const { state, handlers } = useButtonState(
      onPressInOuter || undefined,
      onPressOutOuter || undefined,
      onHoverInOuter || undefined,
      onHoverOutOuter || undefined,
      onFocusOuter || undefined,
      onBlurOuter || undefined,
    );

    // Get button styles based on props
    const { baseStyles, hoverStyles } = React.useMemo(() => {
      return getButtonStyles(t, variant, color, size, shape, disabled || false);
    }, [t, variant, color, size, shape, disabled]);

    // Create context for child components
    const context = React.useMemo<ButtonContextType>(
      () => ({
        ...state,
        variant,
        color,
        size,
        shape,
        disabled: disabled || false,
      }),
      [state, variant, color, size, shape, disabled],
    );

    const flattenedBaseStyles = flatten([baseStyles, style]);

    return (
      <PressableComponent
        role="button"
        accessibilityHint={undefined} // optional
        {...rest}
        // @ts-ignore - this will always be a pressable
        ref={ref}
        aria-label={label}
        aria-pressed={state.pressed}
        accessibilityLabel={label}
        disabled={disabled || false}
        accessibilityState={{
          disabled: disabled || false,
        }}
        style={[
          a.flex_row,
          a.align_center,
          a.justify_center,
          a.gap_xs,
          flattenedBaseStyles,
          ...(state.hovered || state.pressed
            ? [hoverStyles, flatten(hoverStyleProp)]
            : []),
        ]}
        {...handlers}
      >
        <ButtonContext.Provider value={context}>
          {typeof children === 'function' ? (
            children(context)
          ) : isLoading ? (
            <ButtonLoading />
          ) : typeof children === 'string' ? (
            <ButtonText>{children}</ButtonText>
          ) : (
            children
          )}
        </ButtonContext.Provider>
      </PressableComponent>
    );
  },
);

Button.displayName = 'Button';
