import { deviceLanguageCodes, deviceLocales } from '@/src/locale/deviceLocales';
import { findSupportedAppLanguage } from '@/src/locale/helpers';
import { z } from 'zod';

export const schema = z.object({
  fontScale: z.enum(['-2', '-1', '0', '1', '2']),
  fontFamily: z.enum(['system', 'theme']),
  appLanguage: z.string(),
  colorMode: z.enum(['system', 'light', 'dark']),
  darkTheme: z.enum(['dim', 'dark']).optional(),
});
export type TLocalStorageSchema = z.infer<typeof schema>;

export const localStorageDefaults: TLocalStorageSchema = {
  colorMode: 'system',
  darkTheme: 'dim',
  appLanguage: findSupportedAppLanguage([
    deviceLocales.at(0)?.languageTag,
    deviceLanguageCodes[0],
  ]),
  fontScale: '0',
  fontFamily: 'system',
};
