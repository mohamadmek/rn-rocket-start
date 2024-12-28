import { z } from 'zod';

import { findSupportedAppLanguage } from '@/src/locale/helpers';
import { deviceLanguageCodes, deviceLocales } from '@/src/locale/deviceLocales';

export const schema = z.object({
  languagePrefs: z.object({
    appLanguage: z.string(),
  }),
});
export type TPreferenceSchema = z.infer<typeof schema>;

export const PreferenceDefaults: TPreferenceSchema = {
  languagePrefs: {
    // try full language tag first, then fallback to language code
    appLanguage: findSupportedAppLanguage([
      deviceLocales.at(0)?.languageTag,
      deviceLanguageCodes[0],
    ]),
  },
};
