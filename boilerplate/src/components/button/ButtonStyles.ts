import { StyleSheet } from 'react-native';
import { ViewStyle, TextStyle } from 'react-native';
import { atoms as a, select, Theme } from '@/src/theme';
import {
  ButtonVariant,
  ButtonColor,
  ButtonSize,
  ButtonShape,
} from './Button.types';

/**
 * Get base and hover styles for button based on variant, color, size, shape and state
 */
export function getButtonStyles(
  t: any, // Replace with your theme type
  variant?: ButtonVariant,
  color?: ButtonColor,
  size?: ButtonSize,
  shape: ButtonShape = 'default',
  disabled: boolean = false,
) {
  const baseStyles: ViewStyle[] = [];
  const hoverStyles: ViewStyle[] = [];

  // Apply variant and color styles
  applyVariantAndColorStyles(
    t,
    baseStyles,
    hoverStyles,
    variant,
    color,
    disabled,
  );

  // Apply shape and size styles
  applyShapeAndSizeStyles(baseStyles, shape, size);

  return {
    baseStyles,
    hoverStyles,
  };
}

/**
 * Apply styles based on variant and color
 */
function applyVariantAndColorStyles(
  t: Theme,
  baseStyles: ViewStyle[],
  hoverStyles: ViewStyle[],
  variant?: ButtonVariant,
  color?: ButtonColor,
  disabled: boolean = false,
) {
  if (color === 'primary') {
    if (variant === 'solid') {
      if (!disabled) {
        baseStyles.push({
          backgroundColor: t.palette.primary,
        });
        hoverStyles.push({
          backgroundColor: t.palette.primaryHover,
        });
      } else {
        baseStyles.push({
          backgroundColor: select(t.name, {
            light: t.palette.primaryDisabled,
            dim: t.palette.primaryDisabled,
            dark: t.palette.primaryDisabled,
          }),
        });
      }
    } else if (variant === 'outline') {
      baseStyles.push(a.border, t.atoms.bg, {
        borderWidth: 1,
      });

      if (!disabled) {
        baseStyles.push(a.border, {
          borderColor: t.palette.primaryOutline,
        });
        hoverStyles.push(a.border, {
          backgroundColor: t.palette.primaryOutlineHover,
        });
      } else {
        baseStyles.push(a.border, {
          borderColor: t.palette.primaryOutlineDisabled,
        });
      }
    } else if (variant === 'ghost') {
      if (!disabled) {
        baseStyles.push(t.atoms.bg);
        hoverStyles.push({
          backgroundColor: t.palette.gray_100,
        });
      }
    }
  } else if (color === 'secondary') {
    if (variant === 'solid') {
      if (!disabled) {
        baseStyles.push({ backgroundColor: t.palette.secondary });
        hoverStyles.push({ backgroundColor: t.palette.secondaryHover });
      } else {
        baseStyles.push({ backgroundColor: t.palette.secondaryDisabled });
      }
    } else if (variant === 'outline') {
      baseStyles.push(a.border, t.atoms.bg, {
        borderWidth: 1,
      });

      if (!disabled) {
        baseStyles.push(a.border, {
          borderColor: t.palette.secondaryOutline,
        });
        hoverStyles.push({ borderColor: t.palette.secondaryOutlineHover });
      } else {
        baseStyles.push(a.border, {
          borderColor: t.palette.secondaryOutlineDisabled,
        });
      }
    } else if (variant === 'ghost') {
      if (!disabled) {
        baseStyles.push(t.atoms.bg);
        hoverStyles.push({
          backgroundColor: t.palette.gray_200,
        });
      }
    }
  }
}

/**
 * Apply styles based on shape and size
 */
function applyShapeAndSizeStyles(
  baseStyles: ViewStyle[],
  shape: ButtonShape = 'default',
  size?: ButtonSize,
) {
  if (shape === 'default') {
    if (size === 'large') {
      baseStyles.push({
        paddingVertical: 13,
        paddingHorizontal: 20,
        borderRadius: 8,
        gap: 8,
      });
    } else if (size === 'small') {
      baseStyles.push({
        paddingVertical: 9,
        paddingHorizontal: 12,
        borderRadius: 6,
        gap: 6,
      });
    } else if (size === 'tiny') {
      baseStyles.push({
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 4,
        gap: 4,
      });
    }
  } else if (shape === 'round' || shape === 'square') {
    if (size === 'large') {
      if (shape === 'round') {
        baseStyles.push({ height: 46, width: 46 });
      } else {
        baseStyles.push({ height: 44, width: 44 });
      }
    } else if (size === 'small') {
      if (shape === 'round') {
        baseStyles.push({ height: 34, width: 34 });
      } else {
        baseStyles.push({ height: 34, width: 34 });
      }
    } else if (size === 'tiny') {
      if (shape === 'round') {
        baseStyles.push({ height: 22, width: 22 });
      } else {
        baseStyles.push({ height: 21, width: 21 });
      }
    }

    if (shape === 'round') {
      baseStyles.push(a.rounded_full);
    } else if (shape === 'square') {
      if (size === 'tiny') {
        baseStyles.push(a.rounded_xs);
      } else {
        baseStyles.push(a.rounded_sm, a.py_sm);
      }
    }
  }
}

/**
 * Get text styles for button text based on context
 */
export function getButtonTextStyles(
  t: Theme,
  variant?: ButtonVariant,
  color?: ButtonColor,
  size?: ButtonSize,
  disabled: boolean = false,
): TextStyle {
  const baseStyles: TextStyle[] = [];

  if (color === 'primary') {
    if (variant === 'solid') {
      if (!disabled) {
        baseStyles.push({ color: t.palette.white });
      } else {
        baseStyles.push({ color: t.palette.white, opacity: 0.5 });
      }
    } else if (variant === 'outline') {
      if (!disabled) {
        baseStyles.push({
          color: t.palette.primaryOutline,
        });
      } else {
        baseStyles.push({
          color: t.palette.primaryOutlineDisabled,
          opacity: 0.5,
        });
      }
    } else if (variant === 'ghost') {
      if (!disabled) {
        baseStyles.push({ color: t.palette.gray_100 });
      } else {
        baseStyles.push({ color: t.palette.gray_100, opacity: 0.5 });
      }
    }
  } else if (color === 'secondary') {
    if (variant === 'solid') {
      if (!disabled) {
        baseStyles.push({
          color: t.palette.primary,
        });
      } else {
        baseStyles.push({
          color: t.palette.secondaryDisabled,
        });
      }
    } else if (variant === 'outline') {
      if (!disabled) {
        baseStyles.push({
          color: t.palette.secondaryOutline,
        });
      } else {
        baseStyles.push({
          color: t.palette.secondaryOutlineDisabled,
        });
      }
    } else if (variant === 'ghost') {
      if (!disabled) {
        baseStyles.push({
          color: t.palette.gray_200,
        });
      } else {
        baseStyles.push({
          color: t.palette.gray_200,
        });
      }
    }
  } else {
    if (!disabled) {
      baseStyles.push({ color: t.palette.white });
    } else {
      baseStyles.push({ color: t.palette.white, opacity: 0.5 });
    }
  }

  if (size === 'large') {
    baseStyles.push(a.text_md, a.leading_tight);
  } else if (size === 'small') {
    baseStyles.push(a.text_sm, a.leading_tight);
  } else if (size === 'tiny') {
    baseStyles.push(a.text_xs, a.leading_tight);
  }

  return StyleSheet.flatten(baseStyles);
}
