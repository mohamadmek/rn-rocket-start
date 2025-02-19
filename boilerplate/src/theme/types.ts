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
  secondary: string;
  error: string;
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
