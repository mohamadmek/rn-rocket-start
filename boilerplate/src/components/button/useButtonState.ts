import React from 'react';
import {
  GestureResponderEvent,
  MouseEvent,
  NativeSyntheticEvent,
  TargetedEvent,
} from 'react-native';

/**
 * Custom hook to manage button state (hovered, pressed, focused)
 */
export function useButtonState(
  onPressInOuter?: (e: GestureResponderEvent) => void,
  onPressOutOuter?: (e: GestureResponderEvent) => void,
  onHoverInOuter?: (e: MouseEvent) => void,
  onHoverOutOuter?: (e: MouseEvent) => void,
  onFocusOuter?: (e: NativeSyntheticEvent<TargetedEvent>) => void,
  onBlurOuter?: (e: NativeSyntheticEvent<TargetedEvent>) => void,
) {
  const [state, setState] = React.useState({
    pressed: false,
    hovered: false,
    focused: false,
  });

  const onPressIn = React.useCallback(
    (e: GestureResponderEvent) => {
      setState((s) => ({
        ...s,
        pressed: true,
      }));
      onPressInOuter?.(e);
    },
    [setState, onPressInOuter],
  );

  const onPressOut = React.useCallback(
    (e: GestureResponderEvent) => {
      setState((s) => ({
        ...s,
        pressed: false,
      }));
      onPressOutOuter?.(e);
    },
    [setState, onPressOutOuter],
  );

  const onHoverIn = React.useCallback(
    (e: MouseEvent) => {
      setState((s) => ({
        ...s,
        hovered: true,
      }));
      onHoverInOuter?.(e);
    },
    [setState, onHoverInOuter],
  );

  const onHoverOut = React.useCallback(
    (e: MouseEvent) => {
      setState((s) => ({
        ...s,
        hovered: false,
      }));
      onHoverOutOuter?.(e);
    },
    [setState, onHoverOutOuter],
  );

  const onFocus = React.useCallback(
    (e: NativeSyntheticEvent<TargetedEvent>) => {
      setState((s) => ({
        ...s,
        focused: true,
      }));
      onFocusOuter?.(e);
    },
    [setState, onFocusOuter],
  );

  const onBlur = React.useCallback(
    (e: NativeSyntheticEvent<TargetedEvent>) => {
      setState((s) => ({
        ...s,
        focused: false,
      }));
      onBlurOuter?.(e);
    },
    [setState, onBlurOuter],
  );

  return {
    state,
    handlers: {
      onPressIn,
      onPressOut,
      onHoverIn,
      onHoverOut,
      onFocus,
      onBlur,
    },
  };
}
