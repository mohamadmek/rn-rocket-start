import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type TextStyleProp = {
  style?: StyleProp<TextStyle>;
};

export type ViewStyleProp = {
  style?: StyleProp<ViewStyle>;
};

export type ThemeName = 'light' | 'dim' | 'dark';
export type Palette = {
  white: string;
  black: string;
  like: string;

  primary: string;
  primaryHover: string;
  primaryDisabled: string;
  primaryOutline: string;
  primaryOutlineHover: string;
  primaryOutlineDisabled: string;

  secondary: string;
  secondaryHover: string;
  secondaryDisabled: string;
  secondaryOutline: string;
  secondaryOutlineHover: string;
  secondaryOutlineDisabled: string;

  background: string;
  surface: string;

  textPrimary: string;
  textSecondary: string;
  textDisabled: string;

  error: string;
  gray_100: string;
  gray_200: string;
  gray_300: string;
};

export type ThemedAtoms = {
  text: {
    color: string;
  };
  bg: {
    backgroundColor: string;
  };
  shadow_sm: {
    shadowRadius: number;
    shadowOpacity: number;
    elevation: number;
    shadowColor: string;
  };
  shadow_md: {
    shadowRadius: number;
    shadowOpacity: number;
    elevation: number;
    shadowColor: string;
  };
  shadow_lg: {
    shadowRadius: number;
    shadowOpacity: number;
    elevation: number;
    shadowColor: string;
  };
};
export type Theme = {
  scheme: 'light' | 'dark'; // for library support
  name: ThemeName;
  palette: Palette;
  atoms: ThemedAtoms;
};
