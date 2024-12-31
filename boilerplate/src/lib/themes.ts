import { Platform } from 'react-native';

import { colors } from './styles';
import type { Theme } from './ThemeContext';
import { createThemes } from '../theme/themes';
import { tokens } from '../theme';
import { fontWeight } from '../theme/tokens';

const { lightPalette, darkPalette, dimPalette } = createThemes({
  mainColors: {
    primary: 'red',
    secondary: 'gray',
  },
});

export const defaultTheme: Theme = {
  colorScheme: 'light',
  palette: {
    default: {
      background: lightPalette.white,
      backgroundLight: lightPalette.white,
      text: lightPalette.black,
      textLight: lightPalette.black,
      textInverted: lightPalette.white,
      link: lightPalette.black,
      border: lightPalette.black,
      borderDark: lightPalette.black,
      icon: lightPalette.black,
    },
    primary: {
      background: colors.blue3,
      backgroundLight: colors.blue2,
      text: colors.white,
      textLight: colors.blue0,
      textInverted: colors.blue3,
      link: colors.blue0,
      border: colors.blue4,
      borderDark: colors.blue5,
      icon: colors.blue4,
    },
    secondary: {
      background: colors.green3,
      backgroundLight: colors.green2,
      text: colors.white,
      textLight: colors.green1,
      textInverted: colors.green4,
      link: colors.green1,
      border: colors.green4,
      borderDark: colors.green5,
      icon: colors.green4,
    },
    inverted: {
      background: darkPalette.black,
      text: darkPalette.white,
      textInverted: darkPalette.black,
      link: colors.blue0,
      border: colors.blue4,
      borderDark: colors.blue5,
      icon: colors.blue4,
      backgroundLight: colors.blue4,
      textLight: colors.blue4,
    },
    error: {
      background: colors.red3,
      backgroundLight: colors.red2,
      text: colors.white,
      textLight: colors.red1,
      textInverted: colors.red3,
      link: colors.red1,
      border: colors.red4,
      borderDark: colors.red5,
      icon: colors.red4,
    },
  },
  shapes: {
    button: {
      // TODO
    },
    bigButton: {
      // TODO
    },
    smallButton: {
      // TODO
    },
  },
  typography: {
    '2xl-thin': {
      fontSize: 18,
      letterSpacing: tokens.TRACKING,
      fontWeight: fontWeight.normal,
    },
    '2xl': {
      fontSize: 18,
      letterSpacing: tokens.TRACKING,
      fontWeight: fontWeight.normal,
    },
    '2xl-medium': {
      fontSize: 18,
      letterSpacing: tokens.TRACKING,
      fontWeight: fontWeight.bold,
    },
    '2xl-bold': {
      fontSize: 18,
      letterSpacing: tokens.TRACKING,
      fontWeight: fontWeight.bold,
    },
    '2xl-heavy': {
      fontSize: 18,
      letterSpacing: tokens.TRACKING,
      fontWeight: fontWeight.heavy,
    },
    'xl-thin': {
      fontSize: 17,
      letterSpacing: tokens.TRACKING,
      fontWeight: fontWeight.normal,
    },
    xl: {
      fontSize: 17,
      letterSpacing: tokens.TRACKING,
      fontWeight: fontWeight.normal,
    },
    'xl-medium': {
      fontSize: 17,
      letterSpacing: tokens.TRACKING,
      fontWeight: fontWeight.bold,
    },
    'xl-bold': {
      fontSize: 17,
      letterSpacing: tokens.TRACKING,
      fontWeight: fontWeight.bold,
    },
    'xl-heavy': {
      fontSize: 17,
      letterSpacing: tokens.TRACKING,
      fontWeight: fontWeight.heavy,
    },
    'lg-thin': {
      fontSize: 16,
      letterSpacing: tokens.TRACKING,
      fontWeight: fontWeight.normal,
    },
    lg: {
      fontSize: 16,
      letterSpacing: tokens.TRACKING,
      fontWeight: fontWeight.normal,
    },
    'lg-medium': {
      fontSize: 16,
      letterSpacing: tokens.TRACKING,
      fontWeight: fontWeight.bold,
    },
    'lg-bold': {
      fontSize: 16,
      letterSpacing: tokens.TRACKING,
      fontWeight: fontWeight.bold,
    },
    'lg-heavy': {
      fontSize: 16,
      letterSpacing: tokens.TRACKING,
      fontWeight: fontWeight.heavy,
    },
    'md-thin': {
      fontSize: 15,
      letterSpacing: tokens.TRACKING,
      fontWeight: fontWeight.normal,
    },
    md: {
      fontSize: 15,
      letterSpacing: tokens.TRACKING,
      fontWeight: fontWeight.normal,
    },
    'md-medium': {
      fontSize: 15,
      letterSpacing: tokens.TRACKING,
      fontWeight: fontWeight.bold,
    },
    'md-bold': {
      fontSize: 15,
      letterSpacing: tokens.TRACKING,
      fontWeight: fontWeight.bold,
    },
    'md-heavy': {
      fontSize: 15,
      letterSpacing: tokens.TRACKING,
      fontWeight: fontWeight.heavy,
    },
    'sm-thin': {
      fontSize: 14,
      letterSpacing: tokens.TRACKING,
      fontWeight: fontWeight.normal,
    },
    sm: {
      fontSize: 14,
      letterSpacing: tokens.TRACKING,
      fontWeight: fontWeight.normal,
    },
    'sm-medium': {
      fontSize: 14,
      letterSpacing: tokens.TRACKING,
      fontWeight: fontWeight.bold,
    },
    'sm-bold': {
      fontSize: 14,
      letterSpacing: tokens.TRACKING,
      fontWeight: fontWeight.bold,
    },
    'sm-heavy': {
      fontSize: 14,
      letterSpacing: tokens.TRACKING,
      fontWeight: fontWeight.heavy,
    },
    'xs-thin': {
      fontSize: 13,
      letterSpacing: tokens.TRACKING,
      fontWeight: fontWeight.normal,
    },
    xs: {
      fontSize: 13,
      letterSpacing: tokens.TRACKING,
      fontWeight: fontWeight.normal,
    },
    'xs-medium': {
      fontSize: 13,
      letterSpacing: tokens.TRACKING,
      fontWeight: fontWeight.bold,
    },
    'xs-bold': {
      fontSize: 13,
      letterSpacing: tokens.TRACKING,
      fontWeight: fontWeight.bold,
    },
    'xs-heavy': {
      fontSize: 13,
      letterSpacing: tokens.TRACKING,
      fontWeight: fontWeight.heavy,
    },

    'title-2xl': {
      fontSize: 34,
      letterSpacing: tokens.TRACKING,
      fontWeight: fontWeight.bold,
    },
    'title-xl': {
      fontSize: 28,
      letterSpacing: tokens.TRACKING,
      fontWeight: fontWeight.bold,
    },
    'title-lg': {
      fontSize: 22,
      fontWeight: fontWeight.bold,
    },
    title: {
      fontWeight: fontWeight.bold,
      fontSize: 20,
      letterSpacing: tokens.TRACKING,
    },
    'title-sm': {
      fontWeight: fontWeight.bold,
      fontSize: 17,
      letterSpacing: tokens.TRACKING,
    },
    'post-text': {
      fontSize: 16,
      letterSpacing: tokens.TRACKING,
      fontWeight: fontWeight.normal,
    },
    'post-text-lg': {
      fontSize: 20,
      letterSpacing: tokens.TRACKING,
      fontWeight: fontWeight.normal,
    },
    'button-lg': {
      fontWeight: fontWeight.bold,
      fontSize: 18,
      letterSpacing: tokens.TRACKING,
    },
    button: {
      fontWeight: fontWeight.bold,
      fontSize: 14,
      letterSpacing: tokens.TRACKING,
    },
    mono: {
      fontSize: 14,
      fontFamily: Platform.OS === 'android' ? 'monospace' : 'Courier New',
    },
  },
};

export const darkTheme: Theme = {
  ...defaultTheme,
  colorScheme: 'dark',
  palette: {
    ...defaultTheme.palette,
    default: {
      background: darkPalette.black,
      text: darkPalette.white,
      textInverted: darkPalette.black,
      textLight: colors.blue0,
      backgroundLight: colors.blue3,
      link: colors.blue0,
      border: colors.blue4,
      borderDark: colors.blue5,
      icon: colors.blue4,
    },
    primary: {
      ...defaultTheme.palette.primary,
      textInverted: colors.blue2,
    },
    secondary: {
      ...defaultTheme.palette.secondary,
      textInverted: colors.green2,
    },
    inverted: {
      background: darkPalette.white,
      text: lightPalette.black,
      textInverted: darkPalette.white,
      textLight: colors.blue3,
      backgroundLight: colors.blue3,
      link: colors.blue0,
      border: colors.blue4,
      borderDark: colors.blue5,
      icon: colors.blue4,
    },
  },
};

export const dimTheme: Theme = {
  ...darkTheme,
  palette: {
    ...darkTheme.palette,
    default: {
      ...darkTheme.palette.default,
      background: dimPalette.black,
      text: dimPalette.white,
      textInverted: dimPalette.black,
    },
  },
};
