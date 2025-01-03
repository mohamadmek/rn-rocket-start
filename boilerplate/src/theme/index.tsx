import React from 'react';

import {
  computeFontScaleMultiplier,
  getFontFamily,
  getFontScale,
  setFontFamily as persistFontFamily,
  setFontScale as persistFontScale,
} from './fonts';
import { createThemes, defaultTheme } from './themes';
import { Theme, ThemeName } from './types';
import { TLocalStorageSchema } from '../lib/storage/schema';
import { color } from './tokens';

export { atoms } from './atoms';
export * from './breakpoints';
export * from './fonts';
export * as tokens from './tokens';
export * from './types';
export * from './utils/flatten';
export * from './utils/platform';
export * from './themeSelector';
export * from './utils/useGutters';

export type Alf = {
  themeName: ThemeName;
  theme: Theme;
  themes: ReturnType<typeof createThemes>;
  fonts: {
    scale: Exclude<TLocalStorageSchema['fontScale'], undefined>;
    scaleMultiplier: number;
    family: TLocalStorageSchema['fontFamily'];
    setFontScale: (
      fontScale: Exclude<TLocalStorageSchema['fontScale'], undefined>,
    ) => void;
    setFontFamily: (fontFamily: TLocalStorageSchema['fontFamily']) => void;
  };
  /**
   * Feature flags or other gated options
   */
  flags: object;
};

/*
 * Context
 */
export const Context = React.createContext<Alf>({
  themeName: 'light',
  theme: defaultTheme,
  themes: createThemes({
    mainColors: {
      primary: color.temp_purple,
      secondary: color.temp_purple_dark,
    },
  }),
  fonts: {
    scale: getFontScale(),
    scaleMultiplier: computeFontScaleMultiplier(getFontScale()),
    family: getFontFamily(),
    setFontScale: () => {},
    setFontFamily: () => {},
  },
  flags: {},
});

export function ThemeProvider({
  children,
  theme: themeName,
}: React.PropsWithChildren<{ theme: ThemeName }>) {
  const [fontScale, setFontScale] = React.useState<Alf['fonts']['scale']>(() =>
    getFontScale(),
  );
  const [fontScaleMultiplier, setFontScaleMultiplier] = React.useState(() =>
    computeFontScaleMultiplier(fontScale),
  );
  const setFontScaleAndPersist = React.useCallback<
    Alf['fonts']['setFontScale']
  >(
    (fontScale) => {
      setFontScale(fontScale);
      persistFontScale(fontScale);
      setFontScaleMultiplier(computeFontScaleMultiplier(fontScale));
    },
    [setFontScale],
  );
  const [fontFamily, setFontFamily] = React.useState<Alf['fonts']['family']>(
    () => getFontFamily(),
  );
  const setFontFamilyAndPersist = React.useCallback<
    Alf['fonts']['setFontFamily']
  >(
    (fontFamily) => {
      setFontFamily(fontFamily);
      persistFontFamily(fontFamily);
    },
    [setFontFamily],
  );
  const themes = React.useMemo(() => {
    return createThemes({
      mainColors: {
        primary: color.temp_purple,
        secondary: color.temp_purple_dark,
      },
    });
  }, []);

  const value = React.useMemo<Alf>(
    () => ({
      themes,
      themeName: themeName,
      theme: themes[themeName],
      fonts: {
        scale: fontScale,
        scaleMultiplier: fontScaleMultiplier,
        family: fontFamily,
        setFontScale: setFontScaleAndPersist,
        setFontFamily: setFontFamilyAndPersist,
      },
      flags: {},
    }),
    [
      themeName,
      themes,
      fontScale,
      setFontScaleAndPersist,
      fontFamily,
      setFontFamilyAndPersist,
      fontScaleMultiplier,
    ],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useAlf() {
  return React.useContext(Context);
}

export function useTheme(theme?: ThemeName) {
  const alf = useAlf();
  return React.useMemo(() => {
    return theme ? alf.themes[theme] : alf.theme;
  }, [theme, alf]);
}
