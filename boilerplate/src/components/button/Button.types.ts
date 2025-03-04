import type {
  AccessibilityProps,
  PressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { ITextProps } from '../text/Text';

export type ButtonVariant = 'solid' | 'outline' | 'ghost';
export type ButtonColor = 'primary' | 'secondary';
export type ButtonSize = 'tiny' | 'small' | 'large';
export type ButtonShape = 'round' | 'square' | 'default';

export type VariantProps = {
  /**
   * The style variation of the button
   */
  variant?: ButtonVariant;
  /**
   * The color of the button
   */
  color?: ButtonColor;
  /**
   * The size of the button
   */
  size?: ButtonSize;
  /**
   * The shape of the button
   */
  shape?: ButtonShape;
};

export type ButtonState = {
  hovered: boolean;
  focused: boolean;
  pressed: boolean;
  disabled: boolean;
};

export type TButtonContext = VariantProps & ButtonState;

type NonTextElements =
  | React.ReactElement
  | Iterable<React.ReactElement | null | undefined | boolean>;

export type ButtonProps = Pick<
  PressableProps,
  | 'disabled'
  | 'onPress'
  | 'testID'
  | 'onLongPress'
  | 'hitSlop'
  | 'onHoverIn'
  | 'onHoverOut'
  | 'onPressIn'
  | 'onPressOut'
  | 'onFocus'
  | 'onBlur'
> &
  AccessibilityProps &
  VariantProps & {
    testID?: string;
    /**
     * For a11y, try to make this descriptive and clear
     */
    label: string;
    style?: StyleProp<ViewStyle>;
    hoverStyle?: StyleProp<ViewStyle>;
    children:
      | NonTextElements
      | ((context: TButtonContext) => NonTextElements)
      | string;
    PressableComponent?: React.ComponentType<PressableProps>;
    isLoading?: boolean;
  };

export type ButtonTextProps = ITextProps &
  VariantProps & { disabled?: boolean };
