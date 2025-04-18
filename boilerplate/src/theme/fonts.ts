import { TextStyle } from 'react-native';
import { isAndroid, isWeb } from '../platform/detection';
import { appStorage } from '../lib/storage';

export type Device = {
  fontScale: '-2' | '-1' | '0' | '1' | '2';
  fontFamily: 'system' | 'theme';
  lastNuxDialog: string | undefined;
  geolocation?: {
    countryCode: string | undefined;
  };
  trendingBetaEnabled: boolean;
};

const WEB_FONT_FAMILIES = `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"`;

const factor = 0.0625; // 1 - (15/16)
const fontScaleMultipliers: Record<Device['fontScale'], number> = {
  '-2': 1 - factor * 3,
  '-1': 1 - factor * 2,
  '0': 1 - factor * 1, // default
  '1': 1,
  '2': 1 + factor * 1,
};

export function computeFontScaleMultiplier(scale: Device['fontScale']) {
  return fontScaleMultipliers[scale];
}

export function getFontScale() {
  return appStorage.getFontScale() ?? '0';
}

export function setFontScale(fontScale: Device['fontScale']) {
  appStorage.setFontScale(fontScale);
}

export function getFontFamily() {
  return appStorage.getFontFamily() || 'theme';
}

export function setFontFamily(fontFamily: Device['fontFamily']) {
  appStorage.setFontFamily(fontFamily);
}

/*
 * Unused fonts are commented out, but the files are there if we need them.
 */
export function applyFonts(style: TextStyle, fontFamily: 'system' | 'theme') {
  if (fontFamily === 'theme') {
    if (isAndroid) {
      style.fontFamily =
        {
          400: 'Inter-Regular',
          500: 'Inter-Regular',
          600: 'Inter-SemiBold',
          700: 'Inter-SemiBold',
          800: 'Inter-ExtraBold',
          900: 'Inter-ExtraBold',
        }[String(style.fontWeight || '400')] || 'Inter-Regular';

      if (style.fontStyle === 'italic') {
        if (style.fontFamily === 'Inter-Regular') {
          style.fontFamily = 'Inter-Italic';
        } else {
          style.fontFamily += 'Italic';
        }
      }

      /*
       * These are not supported on Android and actually break the styling.
       */
      delete style.fontWeight;
      delete style.fontStyle;
    } else {
      style.fontFamily = 'InterVariable';

      if (style.fontStyle === 'italic') {
        style.fontFamily += 'Italic';
      }
    }

    if (isWeb) {
      // fallback families only supported on web
      style.fontFamily += `, ${WEB_FONT_FAMILIES}`;
    }

    /**
     * Disable contextual alternates in Inter
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant}
     */
    style.fontVariant = (style.fontVariant || []).concat('no-contextual');
  } else {
    // fallback families only supported on web
    if (isWeb) {
      style.fontFamily = style.fontFamily || WEB_FONT_FAMILIES;
    }

    style.letterSpacing = 0.25;
  }
}
