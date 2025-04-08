import { ViewStyle } from 'react-native';
import { atoms as a, Theme } from '@/src/theme';
import {
  ButtonVariant,
  ButtonColor,
  ButtonSize,
  ButtonShape,
} from './Button.types';

// Base styles by variant and color
const variantColorBaseStyles = (
  t: Theme,
  disabled: boolean,
): Record<ButtonVariant, Record<ButtonColor, ViewStyle>> => ({
  solid: {
    primary: {
      backgroundColor: disabled ? t.palette.primaryDisabled : t.palette.primary,
    },
    secondary: {
      backgroundColor: disabled
        ? t.palette.secondaryDisabled
        : t.palette.secondary,
    },
  },
  outline: {
    primary: {
      ...a.border,
      ...t.atoms.bg,
      borderWidth: 1,
      borderColor: disabled
        ? t.palette.primaryOutlineDisabled
        : t.palette.primaryOutline,
    },
    secondary: {
      ...a.border,
      ...t.atoms.bg,
      borderWidth: 1,
      borderColor: disabled
        ? t.palette.secondaryOutlineDisabled
        : t.palette.secondaryOutline,
    },
  },
  ghost: {
    primary: disabled ? {} : { ...t.atoms.bg },
    secondary: disabled ? {} : { ...t.atoms.bg },
  },
});

// Hover styles by variant and color
const variantColorHoverStyles = (
  t: Theme,
): Record<ButtonVariant, Record<ButtonColor, ViewStyle>> => ({
  solid: {
    primary: {
      backgroundColor: t.palette.primaryHover,
    },
    secondary: {
      backgroundColor: t.palette.secondaryHover,
    },
  },
  outline: {
    primary: {
      ...a.border,
      backgroundColor: t.palette.primaryOutlineHover,
    },
    secondary: {
      borderColor: t.palette.secondaryOutlineHover,
    },
  },
  ghost: {
    primary: {
      backgroundColor: t.palette.gray_100,
    },
    secondary: {
      backgroundColor: t.palette.gray_200,
    },
  },
});

// Size and shape styles for the button
const sizeStyles: Record<ButtonSize, Record<ButtonShape, ViewStyle>> = {
  large: {
    default: {
      paddingVertical: 13,
      paddingHorizontal: 20,
      borderRadius: 8,
      gap: 8,
    },
    round: {
      height: 46,
      width: 46,
      ...a.rounded_full,
    },
    square: {
      height: 44,
      width: 44,
    },
  },
  small: {
    default: {
      paddingVertical: 9,
      paddingHorizontal: 12,
      borderRadius: 6,
      gap: 6,
    },
    round: {
      height: 34,
      width: 34,
      ...a.rounded_full,
    },
    square: {
      height: 34,
      width: 34,
    },
  },
  tiny: {
    default: {
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 4,
      gap: 4,
    },
    round: {
      height: 22,
      width: 22,
      ...a.rounded_full,
    },
    square: {
      height: 21,
      width: 21,
    },
  },
};

// Default styles when size is not specified
const defaultSizeStyles: Record<ButtonShape, ViewStyle> = {
  default: {
    ...a.rounded_sm,
    ...a.py_md,
  },
  round: {
    ...a.py_md,
    ...a.rounded_full,
  },
  square: {
    ...a.py_md,
  },
};

/**
 * Get base and hover styles for button based on variant, color, size, shape and state
 * Uses a more declarative approach with style maps for better maintainability
 */
export function getButtonStyles(
  t: Theme,
  variant: ButtonVariant = 'solid',
  color: ButtonColor = 'primary',
  size?: ButtonSize,
  shape: ButtonShape = 'default',
  disabled: boolean = false,
) {
  const baseStyles: ViewStyle[] = [];
  const hoverStyles: ViewStyle[] = [];

  // Apply variant and color styles
  const baseVariantColorStyles = variantColorBaseStyles(t, disabled);
  if (
    baseVariantColorStyles[variant] &&
    baseVariantColorStyles[variant][color]
  ) {
    baseStyles.push(baseVariantColorStyles[variant][color]);
  }

  // Apply hover styles only if not disabled
  if (!disabled) {
    const hoverVariantColorStyles = variantColorHoverStyles(t);
    if (
      hoverVariantColorStyles[variant] &&
      hoverVariantColorStyles[variant][color]
    ) {
      hoverStyles.push(hoverVariantColorStyles[variant][color]);
    }
  }

  // Apply shape and size styles - use the specific size style if provided, otherwise use default
  if (size && sizeStyles[size]) {
    const shapeStyle = sizeStyles[size][shape] || sizeStyles[size].default;
    baseStyles.push(shapeStyle);
  } else {
    // Use default styles when no size is specified
    const shapeStyle = defaultSizeStyles[shape] || defaultSizeStyles.default;
    baseStyles.push(shapeStyle);
  }

  return {
    baseStyles,
    hoverStyles,
  };
}
