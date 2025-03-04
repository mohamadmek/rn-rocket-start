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
    flame: '#FF3E00', // Rocket flame color
    spaceDark: '#1E1E2E', // Deep space gray-blue
    white: '#FFFFFF',
  } as const;

  const lightPalette: Palette = {
    white: '#fff',
    black: '#000',
    like: color.like,
    error: color.flame,
    primaryHover: '#D93600', // Darker flame for hover
    primaryDisabled: '#FFA891', // Faded version for disabled
    primaryOutline: '#FF3E00',
    primaryOutlineHover: '#D93600',
    primaryOutlineDisabled: '#FFA891',

    secondaryHover: '#DADAE0',
    secondaryDisabled: '#B0B0BA',
    secondaryOutline: '#5A5A6E',
    secondaryOutlineHover: '#3F3F51',
    secondaryOutlineDisabled: '#B0B0BA',

    background: '#FFFFFF', // Light background
    surface: '#F5F5F7', // Soft light surface

    textPrimary: '#1E1E2E', // Dark text
    textSecondary: '#5A5A6E', // Soft gray
    textDisabled: '#B0B0BA', // Muted gray

    gray_100: '#DADAE0',
    gray_200: '#B0B0BA',
    gray_300: '#8A8A99',
    ...mainColors,
  } as const;

  const darkPalette: Palette = {
    white: '#fff',
    black: '#000',
    like: color.like,
    error: color.flame,
    primaryHover: '#D93600',
    primaryDisabled: '#FFA891',
    primaryOutline: '#FF3E00',
    primaryOutlineHover: '#D93600',
    primaryOutlineDisabled: '#FFA891',

    secondaryHover: '#29293A',
    secondaryDisabled: '#5A5A6E',
    secondaryOutline: '#5A5A6E',
    secondaryOutlineHover: '#3F3F51',
    secondaryOutlineDisabled: '#5A5A6E',

    background: '#0A0A14', // Dark space black
    surface: '#151521', // Dark panel color

    textPrimary: color.white,
    textSecondary: '#C7C7D3',
    textDisabled: '#5A5A6E',

    gray_100: '#3B3B4F',
    gray_200: '#2A2A3A',
    gray_300: color.spaceDark,
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
