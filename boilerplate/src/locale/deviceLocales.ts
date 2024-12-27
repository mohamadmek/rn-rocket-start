import { dedupArray } from '@/src/lib/functions';
import { getLocales as defaultGetLocales, Locale } from 'expo-localization';

type LocalWithLanguageCode = Locale & {
  languageCode: string;
};

export function getLocales() {
  const locales = defaultGetLocales?.() ?? [];
  const output: LocalWithLanguageCode[] = [];

  for (const locale of locales) {
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
