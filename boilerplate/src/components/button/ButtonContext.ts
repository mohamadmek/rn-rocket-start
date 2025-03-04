import React from 'react';
import { TButtonContext } from './Button.types';

const initialContext: TButtonContext = {
  hovered: false,
  focused: false,
  pressed: false,
  disabled: false,
  variant: undefined,
  color: undefined,
  size: undefined,
  shape: undefined,
};

export const ButtonContext =
  React.createContext<TButtonContext>(initialContext);

export function useButtonContext() {
  return React.useContext(ButtonContext);
}
