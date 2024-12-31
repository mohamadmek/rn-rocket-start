import React from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';

import { ThemeName } from './types';
import { createThemes } from './themes';
import { useThemePrefs } from './color-mode';
import { isWeb } from '../platform/detection';
import { TLocalStorageSchema } from '../lib/storage/schema';

export function useColorModeTheme(): ThemeName {
  const theme = useThemeName();

  React.useLayoutEffect(() => {
    updateDocument(theme);
  }, [theme]);

  return theme;
}

export function useThemeName(): ThemeName {
  const colorScheme = useColorScheme();

  const { colorMode, darkTheme } = useThemePrefs();

  return getThemeName(colorScheme, colorMode, darkTheme);
}

function getThemeName(
  colorScheme: ColorSchemeName,
  colorMode: TLocalStorageSchema['colorMode'],
  darkTheme?: ThemeName,
) {
  if (
    (colorMode === 'system' && colorScheme === 'light') ||
    colorMode === 'light'
  ) {
    return 'light';
  } else {
    return darkTheme ?? 'dim';
  }
}

function updateDocument(theme: ThemeName) {
  // @ts-ignore web only
  if (isWeb && typeof window !== 'undefined') {
    // @ts-ignore web only
    const html = window.document.documentElement;
    // @ts-ignore web only
    const meta = window.document.querySelector('meta[name="theme-color"]');

    // remove any other color mode classes
    html.className = html.className.replace(/(theme)--\w+/g, '');
    html.classList.add(`theme--${theme}`);
    // set color to 'theme-color' meta tag
    meta?.setAttribute('content', getBackgroundColor(theme));
  }
}

export function getBackgroundColor(theme: ThemeName): string {
  const { dark, light, dim } = createThemes({
    mainColors: {
      primary: 'red',
      secondary: 'gray',
    },
  });
  switch (theme) {
    case 'light':
      return light.atoms.bg.backgroundColor;
    case 'dark':
      return dark.atoms.bg.backgroundColor;
    case 'dim':
      return dim.atoms.bg.backgroundColor;
  }
}
