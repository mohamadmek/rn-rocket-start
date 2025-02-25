import { atoms } from './atoms';
import { appColors } from './tokens';
import { Palette, Theme } from './types';

const themes = createThemes({
  mainColors: {
    primary: appColors.primary,
    secondary: appColors.secondary,
  },
});

export const defaultTheme = themes.light;

export function createThemes({
  mainColors,
}: {
  mainColors: {
    primary: string;
    secondary: string;
  };
}): {
  lightPalette: Palette;
  darkPalette: Palette;
  dimPalette: Palette;
  light: Theme;
  dark: Theme;
  dim: Theme;
} {
  const color = {
    like: '#ec4899',
    trueBlack: '#000000',
  } as const;

  const lightPalette: Palette = {
    white: '#fff',
    black: '#000',
    like: color.like,
    error: '#FF3B30',
    ...mainColors,
  } as const;

  const darkPalette: Palette = {
    white: '#fff',
    black: color.trueBlack,
    like: color.like,
    error: '#FF3B30',
    ...mainColors,
  } as const;

  const dimPalette: Palette = {
    ...darkPalette,
  } as const;

  const light: Theme = {
    scheme: 'light',
    name: 'light',
    palette: lightPalette,
    atoms: {
      text: {
        color: lightPalette.black,
      },
      bg: {
        backgroundColor: lightPalette.white,
      },
      shadow_sm: {
        ...atoms.shadow_sm,
        shadowColor: lightPalette.black,
      },
      shadow_md: {
        ...atoms.shadow_md,
        shadowColor: lightPalette.black,
      },
      shadow_lg: {
        ...atoms.shadow_lg,
        shadowColor: lightPalette.black,
      },
    },
  };

  const dark: Theme = {
    scheme: 'dark',
    name: 'dark',
    palette: darkPalette,
    atoms: {
      text: {
        color: darkPalette.white,
      },
      bg: {
        backgroundColor: darkPalette.black,
      },
      shadow_sm: {
        ...atoms.shadow_sm,
        shadowOpacity: 0.7,
        shadowColor: color.trueBlack,
      },
      shadow_md: {
        ...atoms.shadow_md,
        shadowOpacity: 0.7,
        shadowColor: color.trueBlack,
      },
      shadow_lg: {
        ...atoms.shadow_lg,
        shadowOpacity: 0.7,
        shadowColor: color.trueBlack,
      },
    },
  };

  const dim: Theme = {
    ...dark,
    scheme: 'dark',
    name: 'dim',
    palette: dimPalette,
    atoms: {
      ...dark.atoms,
      text: {
        color: dimPalette.white,
      },
      bg: {
        backgroundColor: dimPalette.black,
      },
      shadow_sm: {
        ...atoms.shadow_sm,
        shadowOpacity: 0.7,
        shadowColor: mainColors.primary,
      },
      shadow_md: {
        ...atoms.shadow_md,
        shadowOpacity: 0.7,
        shadowColor: mainColors.primary,
      },
      shadow_lg: {
        ...atoms.shadow_lg,
        shadowOpacity: 0.7,
        shadowColor: mainColors.primary,
      },
    },
  };

  return {
    lightPalette,
    darkPalette,
    dimPalette,
    light,
    dark,
    dim,
  };
}
