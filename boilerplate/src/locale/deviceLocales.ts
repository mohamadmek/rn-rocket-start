import { dedupArray } from '@/src/lib/functions';
import { getLocales as defaultGetLocales, Locale } from 'expo-localization';

type LocalWithLanguageCode = Locale & {
  languageCode: string;
};

export function getLocales() {
  const locales = defaultGetLocales?.() ?? [];
  const output: LocalWithLanguageCode[] = [];

  for (const locale of locales) {
    if (typeof locale.languageCode === 'string') {
      if (locale.languageCode === 'in') {
        // indonesian
        locale.languageCode = 'id';
      }
      if (locale.languageCode === 'iw') {
        // hebrew
        locale.languageCode = 'he';
      }
      if (locale.languageCode === 'ji') {
        // yiddish
        locale.languageCode = 'yi';
      }
    }

    if (typeof locale.languageTag === 'string') {
      if (locale.languageTag.startsWith('zh-Hans')) {
        // Simplified Chinese to zh-CN
        locale.languageTag = 'zh-CN';
      }
      if (locale.languageTag.startsWith('zh-Hant')) {
        // Traditional Chinese to zh-TW
        locale.languageTag = 'zh-TW';
      }
      if (locale.languageTag.startsWith('yue')) {
        // Cantonese (Yue) to zh-HK
        locale.languageTag = 'zh-HK';
      }
    }

    // @ts-ignore checked above
    output.push(locale);
  }

  return output;
}

export const deviceLocales = getLocales();

/**
 * BCP-47 language tag without region e.g. array of 2-char lang codes
 *
 * {@link https://docs.expo.dev/versions/latest/sdk/localization/#locale}
 */
export const deviceLanguageCodes = dedupArray(
  deviceLocales.map((l) => l.languageCode),
);
